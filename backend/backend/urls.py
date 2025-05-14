from django.urls import path
from api.views import UsuarioCreateView, UsuarioListView, UsuarioUpdateView, UsuarioDeleteView, UsuarioAtualView

urlpatterns = [
    path('api/usuarios/', UsuarioCreateView.as_view(), name='cadastro-usuario'),
    path('api/usuarios/', UsuarioListView.as_view(), name='usuario-list'),
    path('api/usuarios/<int:pk>/', UsuarioUpdateView.as_view(), name='usuario-update'),
    path('api/usuarios/<int:pk>/delete/', UsuarioDeleteView.as_view(), name='usuario-delete'),
    path('api/usuarios/me/', UsuarioAtualView.as_view(), name='usuario-atual'),
]