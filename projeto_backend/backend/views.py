from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Usuario
from .serializers import UsuarioLoginSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = UsuarioLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            senha = serializer.validated_data['senha']

            try:
                usuario = Usuario.objects.get(email=email)
                if usuario.senha == senha:
                    return Response({
                        "id": usuario.id_usuario,
                        "nome": usuario.nome,
                        "nivel_acesso": usuario.nivel_acesso
                    }, status=200)
                else:
                    return Response({"erro": "Senha incorreta"}, status=401)
            except Usuario.DoesNotExist:
                return Response({"erro": "Usuário não encontrado"}, status=404)

        return Response(serializer.errors, status=400)