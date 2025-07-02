import pytest
from rest_framework.test import APIClient
from rest_framework import status
from produtos.models import Produto, Fornecedor, TipoDeMadeira, MovimentacaoEstoque
from datetime import datetime
from api.models import Usuario
from django.utils import timezone

@pytest.mark.django_db
class TestDashboardAPI:
    """
    Suíte de testes para os endpoints de relatórios e dashboard.
    """

    def test_dashboard_stats_requer_autenticacao(self):
        """Verifica se o endpoint do dashboard é protegido."""
        client = APIClient()
        response = client.get("/api/dashboard-stats/")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_dashboard_stats_retorna_dados_corretos(self, api_client_admin):
        """
        Verifica se o endpoint do dashboard responde com a estrutura de dados correta
        para um usuário autenticado.
        """
        response = api_client_admin.get("/api/dashboard-stats/")
        
        assert response.status_code == status.HTTP_200_OK
        
        # Verifica se as chaves principais da resposta existem
        assert 'stats' in response.data
        assert 'top_produtos' in response.data
        assert 'fornecedores_recentes' in response.data
        
        # Verifica as sub-chaves das estatísticas
        assert 'total_fornecedores' in response.data['stats']
        assert 'total_produtos_em_estoque' in response.data['stats']
        assert 'valor_total_estoque' in response.data['stats']


@pytest.mark.django_db
class TestRelatoriosAPI:
    def setup_method(self):
        # Cria dados para o relatório
        
        user = Usuario.objects.create_user(username="report@user.com", email="report@user.com", password="123")
        fornecedor = Fornecedor.objects.create(nome="Fornecedor Relatório", email="relatorio@f.com")
        tipo = TipoDeMadeira.objects.create(nome="Madeira Relatório")
        produto = Produto.objects.create(nome="Produto Relatório", valor=1, fornecedor=fornecedor, tipo_de_madeira=tipo, dimensoes_comprimento=1, dimensoes_largura=1)
        
        # Cria uma movimentação em um mês/ano específico
        self.movimentacao = MovimentacaoEstoque.objects.create(produto=produto, tipo_movimentacao="ENTRADA", quantidade=10, usuario=user)
        data_especifica_com_fuso = timezone.make_aware(timezone.datetime(2025, 6, 15))
        
        # Atualizamos a movimentação para ter a data exata que queremos testar
        MovimentacaoEstoque.objects.filter(pk=self.movimentacao.pk).update(data_movimentacao=data_especifica_com_fuso)
        self.movimentacao.save()


    def test_gerar_relatorio_pdf(self, api_client_admin):
        """Verifica se o download de PDF funciona e retorna o tipo de conteúdo correto."""
        ano = self.movimentacao.data_movimentacao.year
        mes = self.movimentacao.data_movimentacao.month
        
        response = api_client_admin.get(f"/api/relatorios/gerar-movimentacao/{ano}/{mes}/?formato=pdf")
        
        assert response.status_code == 200
        assert response.headers['Content-Type'] == 'application/pdf'
        assert 'attachment; filename=' in response.headers['Content-Disposition']

    def test_gerar_relatorio_excel(self, api_client_admin):
        """Verifica se o download de Excel funciona e retorna o tipo de conteúdo correto."""
        ano = self.movimentacao.data_movimentacao.year
        mes = self.movimentacao.data_movimentacao.month

        response = api_client_admin.get(f"/api/relatorios/gerar-movimentacao/{ano}/{mes}/?formato=excel")

        assert response.status_code == 200
        assert response.headers['Content-Type'] == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        assert 'attachment; filename=' in response.headers['Content-Disposition']