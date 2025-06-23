from django_filters.rest_framework import DjangoFilterBackend
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
    Endpoint para consulta de produtos que inclui a quantidade em estoque.
    Suporta filtros por nome, tipo de madeira, fornecedor e condição.
    Exemplo: /api/consulta-produtos/?nome=Caibro&fornecedor__nome=Madeiras+Z
    """
    # Usamos .select_related para otimizar a consulta, buscando dados
    # das tabelas relacionadas (estoque, fornecedor, etc.) em uma única query.
    queryset = Produto.objects.select_related('estoque', 'fornecedor', 'tipo_de_madeira').all()
    
    # Usamos um serializer de Produto, mas precisaremos adicionar o estoque a ele.
    serializer_class = ProdutoSerializer 
    
    # Configuração dos filtros
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    
    # Define os campos pelos quais podemos filtrar
    filterset_fields = {
        'tipo_de_madeira__nome': ['exact'],
        'fornecedor__nome': ['exact'],
        'condicao': ['incontains'],  # 'icontains' permite busca parcial (ex: ?condicao=novo)
        'valor': ['exact', 'lte', 'gte'], # lte = menor ou igual, gte = maior ou igual
    }
    
    # Define o campo para a busca textual (ex: ?search=Caibro)
    search_fields = ['nome']

    # --- MÉTODO get_queryset ADICIONADO ---
    # Vamos sobrescrever o método que busca os dados para adicionar o cálculo
    def get_queryset(self):
        # Começamos com a consulta base
        queryset = Produto.objects.select_related('fornecedor', 'tipo_de_madeira').all()
        
        # Usamos annotate para criar um novo campo 'quantidade_em_estoque' em tempo real
        # Coalesce(..., 0) garante que, se não houver movimentações, o valor será 0 e não nulo.
        queryset = queryset.annotate(
            quantidade_em_estoque=Coalesce(Sum('movimentacoes__quantidade'), 0)
        )
        return queryset