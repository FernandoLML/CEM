from django.urls import path
from api.views import UsuarioCreateView

urlpatterns = [
    path('api/usuarios/', UsuarioCreateView.as_view(), name='cadastro-usuario'),
]