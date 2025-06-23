from rest_framework import viewsets
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