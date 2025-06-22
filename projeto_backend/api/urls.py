from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, LoginView

router = DefaultRouter()
# O registro agora é mais limpo, sem o prefixo 'api/'
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

# Este arquivo define as URLs específicas do app 'api'
urlpatterns = [
    # Inclui as rotas do router (ex: /api/usuarios/)
    path('', include(router.urls)),
    # Inclui a rota de login (ex: /api/login/)
    path('login/', LoginView.as_view(), name='login'),
]