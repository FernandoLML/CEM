from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FornecedorViewSet, TipoDeMadeiraViewSet, ProdutoViewSet, EstoqueViewSet, MovimentacaoEstoqueViewSet, ProdutoEstoqueViewSet

router = DefaultRouter()
router.register(r'fornecedores', FornecedorViewSet, basename='fornecedor')
router.register(r'tipos-madeira', TipoDeMadeiraViewSet, basename='tipomadeira')
router.register(r'produtos', ProdutoViewSet, basename='produto')
router.register(r'estoque', EstoqueViewSet, basename='estoque')
router.register(r'movimentacoes-estoque', MovimentacaoEstoqueViewSet, basename='movimentacaoestoque')
router.register(r'consulta-produtos', ProdutoEstoqueViewSet, basename='consultaproduto')

urlpatterns = [
    path('', include(router.urls)),
]