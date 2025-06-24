from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum
from django.db.models.functions import Coalesce
from rest_framework import filters, viewsets
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
    