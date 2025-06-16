from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UsuarioViewSet
from api.views import LoginView

router = DefaultRouter()
router.register(r'api/usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),  # ⬅️ Registrar a rota de login
]