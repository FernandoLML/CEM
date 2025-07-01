from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum, F, Value, DecimalField, ExpressionWrapper, Count
from django.db.models.functions import Coalesce
from rest_framework.views import APIView
from rest_framework import filters, viewsets, permissions
from rest_framework.response import Response
from .models import Fornecedor, TipoDeMadeira, Produto, Estoque, MovimentacaoEstoque
from .serializers import FornecedorSerializer, TipoDeMadeiraSerializer, ProdutoSerializer, EstoqueSerializer, MovimentacaoEstoqueSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer
    # permission_classes = [IsAuthenticated] # Adicione permissões depois

class TipoDeMadeiraViewSet(viewsets.ModelViewSet):
    queryset = TipoDeMadeira.objects.all()
    serializer_class = TipoDeMadeiraSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer


class EstoqueViewSet(viewsets.ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer


class MovimentacaoEstoqueViewSet(viewsets.ModelViewSet):
    # Ordena as movimentações da mais recente para a mais antiga
    queryset = MovimentacaoEstoque.objects.all().order_by('-data_movimentacao')
    serializer_class = MovimentacaoEstoqueSerializer


class ProdutoEstoqueViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Endpoint para consulta de produtos que inclui a quantidade em estoque calculada.
    """
    # Usamos o serializer de Produto que já está pronto para receber o campo calculado.
    serializer_class = ProdutoSerializer
    
    # Configuração dos filtros.
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        'tipo_de_madeira__nome': ['exact'],
        'fornecedor__nome': ['exact'],
        'condicao': ['icontains'], # Busca parcial por texto na condição
    }
    search_fields = ['nome', 'condicao'] # Busca principal pelo nome do produto

    # --- MÉTODO get_queryset PARA CÁLCULO DINÂMICO ---
    def get_queryset(self):
        """
        Este método é chamado pelo Django para buscar os dados.
        Ele garante que o cálculo de estoque seja sempre feito.
        """
        # A consulta base otimizada.
        queryset = Produto.objects.select_related('fornecedor', 'tipo_de_madeira').all()
        
        # 'movimentacoes' é o related_name que definimos no modelo MovimentacaoEstoque.
        # A anotação cria o campo 'quantidade_em_estoque' em tempo real para cada produto.
        queryset = queryset.annotate(
            quantidade_em_estoque=Coalesce(Sum('movimentacoes__quantidade'), 0)
        )
        return queryset
    

# --- VIEWSET PARA OS DADOS DO DASHBOARD ---
class DashboardStatsView(APIView):
    """
    Endpoint único que fornece todos os dados agregados para o dashboard.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        # 1. Cálculos de Estatísticas (como já tínhamos)
        total_fornecedores = Fornecedor.objects.count()
        total_produtos_em_estoque = Estoque.objects.aggregate(
            total=Coalesce(Sum('quantidade'), 0)
        )['total']
        valor_total_estoque = Estoque.objects.annotate(
            valor_item=ExpressionWrapper(
                F('quantidade') * F('produto__valor'), 
                output_field=DecimalField()
            )
        ).aggregate(
            total=Coalesce(Sum('valor_item'), Value(0, output_field=DecimalField()))
        )['total']

        # 2. Busca dos 5 Fornecedores mais recentes
        fornecedores_recentes = Fornecedor.objects.order_by('-id')[:5]
        
        # 3. Busca dos 5 Produtos mais movimentados
        top_produtos_movimentados = Produto.objects.annotate(
            num_movimentacoes=Count('movimentacoes')
        ).order_by('-num_movimentacoes')[:5]

        # 4. Serialização dos dados das listas
        fornecedores_serializer = FornecedorSerializer(fornecedores_recentes, many=True)
        top_produtos_serializer = ProdutoSerializer(top_produtos_movimentados, many=True)

        # 5. Montagem da resposta final em um único objeto JSON
        data = {
            'stats': {
                'total_fornecedores': total_fornecedores,
                'total_produtos_em_estoque': total_produtos_em_estoque,
                'valor_total_estoque': valor_total_estoque,
            },
            'top_produtos': top_produtos_serializer.data,
            'fornecedores_recentes': fornecedores_serializer.data,
        }
        return Response(data)
