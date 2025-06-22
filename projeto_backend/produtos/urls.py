from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FornecedorViewSet, TipoDeMadeiraViewSet, ProdutoViewSet

router = DefaultRouter()
router.register(r'fornecedores', FornecedorViewSet, basename='fornecedor')
router.register(r'tipos-madeira', TipoDeMadeiraViewSet, basename='tipomadeira')
router.register(r'produtos', ProdutoViewSet, basename='produto')

urlpatterns = [
    path('', include(router.urls)),
]