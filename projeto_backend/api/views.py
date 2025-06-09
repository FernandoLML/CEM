from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import Usuario
from .serializer import UsuarioSerializer
from backend.serializers import UsuarioLoginSerializer
from rest_framework.views import APIView

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    def get_permissions(self):
        """Configura permissões dinâmicas baseadas na ação"""
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action == 'destroy':
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Endpoint para obter o usuário atual"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def perform_create(self, serializer):
        """Personalização ao criar usuário"""
        # Adicione lógica adicional se necessário
        serializer.save()


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