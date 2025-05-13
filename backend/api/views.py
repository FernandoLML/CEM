from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Usuario
from .serializer import UsuarioSerializer

class UsuarioCreateView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]  # Exige autenticação

    def perform_create(self, serializer):
        serializer.save()  # O serializer já aplica as regras de nivel_acesso