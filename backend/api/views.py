from rest_framework import generics
from .models import Usuario
from .serializer import UsuarioSerializer
from rest_framework.response import Response
from rest_framework import status

class UsuarioCreateView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Criptografe a senha antes de salvar (use Django's make_password)
            usuario = serializer.save()
            return Response({"success": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)