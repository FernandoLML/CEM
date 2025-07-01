# em relatorios/views.py

from django.db.models.functions import TruncMonth, Cast
from django.db.models import Sum, F, Value, DecimalField, ExpressionWrapper, DateField, Count
from django.db.models.functions import Coalesce
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from produtos.models import Produto 
from produtos.serializers import ProdutoSerializer

# Importa o modelo de outro app
from produtos.models import MovimentacaoEstoque

# --- Importações para geração de arquivos ---
# PDF
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
# Excel
from openpyxl import Workbook


# --- VIEW PARA GERAR OS RELATÓRIOS ---
class GerarRelatorioMovimentacaoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ano, mes, *args, **kwargs):
        formato = request.query_params.get('formato', 'pdf')

        try:
            # Busca as movimentações do mês e ano especificados
            movimentacoes = MovimentacaoEstoque.objects.filter(
                data_movimentacao__year=ano,
                data_movimentacao__month=mes
            ).select_related('produto', 'usuario').order_by('data_movimentacao')
        except (ValueError, TypeError):
            return Response({"erro": "Mês e ano inválidos."}, status=400)

        # --- GERAÇÃO DO PDF ---
        if formato == 'pdf':
            response = HttpResponse(content_type='application/pdf')
            filename = f"relatorio_movimentacoes_{mes:02d}_{ano}.pdf"
            response['Content-Disposition'] = f'attachment; filename="{filename}"'

            doc = SimpleDocTemplate(response, pagesize=A4, topMargin=72, bottomMargin=72)
            story = []
            styles = getSampleStyleSheet()

            # Título
            titulo = Paragraph(f"Relatório de Movimentações - {mes:02d}/{ano}", styles['h1'])
            story.append(titulo)
            story.append(Spacer(1, 0.2 * inch))

            # Dados da Tabela
            dados_tabela = [['Produto', 'Tipo', 'Qtd', 'Data', 'Usuário']]
            for mov in movimentacoes:
                data_formatada = mov.data_movimentacao.strftime('%d/%m/%Y %H:%M')
                dados_tabela.append([
                    mov.produto.nome, mov.tipo_movimentacao, mov.quantidade,
                    data_formatada, mov.usuario.email if mov.usuario else 'N/A'
                ])
            
            # Criação e Estilo da Tabela
            tabela = Table(dados_tabela, colWidths=[2.5*inch, 1*inch, 0.7*inch, 1.3*inch, 1.5*inch])
            tabela.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#007BFF')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.whitesmoke, colors.HexColor('#e5f2ff')])
            ]))
            story.append(tabela)
            story.append(Spacer(1, 0.5 * inch))
            
            # Calcula o total de entradas (soma das quantidades positivas)
            total_entradas = sum(m.quantidade for m in movimentacoes if m.tipo_movimentacao == 'ENTRADA')
            
            # Calcula o total de saídas (soma das quantidades negativas)
            total_saidas = sum(m.quantidade for m in movimentacoes if m.tipo_movimentacao == 'SAIDA')
            
            # Monta o texto do resumo usando tags HTML para negrito e quebra de linha
            texto_resumo = f"""
                <b>Resumo do Mês:</b><br/>
                Total de Itens de Entrada: {total_entradas}<br/>
                Total de Itens de Saída: {abs(total_saidas)}
            """
            resumo = Paragraph(texto_resumo, styles['Normal'])
            story.append(resumo)
            story.append(Spacer(1, 0.5 * inch))

            # Filtra produtos que tiveram movimentação no mês/ano do relatório
            produtos_do_mes = Produto.objects.filter(
                movimentacoes__data_movimentacao__year=ano,
                movimentacoes__data_movimentacao__month=mes
            ).annotate(
                num_movimentacoes_mes=Count('id') # Conta as movimentações para cada produto
            ).order_by('-num_movimentacoes_mes')[:3]

            if produtos_do_mes:
                story.append(Paragraph("<b>Produtos Mais Movimentados no Mês:</b>", styles['h3']))
                story.append(Spacer(1, 0.1 * inch))
                
                dados_top_produtos = [['Produto', 'Nº de Movimentações']]
                for p in produtos_do_mes:
                    dados_top_produtos.append([p.nome, p.num_movimentacoes_mes])
                
                tabela_top = Table(dados_top_produtos, colWidths=[4*inch, 2*inch])
                tabela_top.setStyle(TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4a4a4a')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ]))
                story.append(tabela_top)


            doc.build(story)
            return response

        # --- LÓGICA DO EXCEL RESTAURADA ---
        elif formato == 'excel':
            response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            filename = f"relatorio_movimentacoes_{mes:02d}_{ano}.xlsx"
            response['Content-Disposition'] = f'attachment; filename="{filename}"'

            wb = Workbook()
            ws = wb.active
            ws.title = "Movimentações"
            
            # Cabeçalho
            ws.append(["ID", "Produto", "Tipo", "Quantidade", "Data", "Registrado Por", "Observações"])
            
            # Dados
            for mov in movimentacoes:
                data_formatada = mov.data_movimentacao.strftime('%d/%m/%Y %H:%M') if mov.data_movimentacao else None
                email_usuario = mov.usuario.email if mov.usuario else 'N/A'
                ws.append([
                    mov.id, mov.produto.nome, mov.tipo_movimentacao, mov.quantidade,
                    data_formatada, email_usuario, mov.observacoes or ''
                ])
                
            wb.save(response)
            return response
        
        return Response({"erro": "Formato de relatório inválido."}, status=400)


# --- VIEW PARA LISTAR MESES COM MOVIMENTAÇÕES (versão limpa) ---
class MesesMovimentacaoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Consulta para encontrar meses únicos com movimentações
        datas = MovimentacaoEstoque.objects.annotate(
            mes_ano=TruncMonth('data_movimentacao', output_field=DateField())
        ).values('mes_ano').distinct().order_by('-mes_ano')

        # Formata a resposta para o frontend
        meses_formatados = [
            {
                "ano": data['mes_ano'].year,
                "mes": data['mes_ano'].month,
                "nome": data['mes_ano'].strftime('%m/%Y')
            }
            for data in datas if data.get('mes_ano')
        ]
        
        return Response(meses_formatados)