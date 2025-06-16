from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password  # 1. Importe a função
from api.models import Usuario
from .serializer import UsuarioSerializer
from backend.serializers import UsuarioLoginSerializer

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
                
                # 2. Use check_password para comparar as senhas
                if check_password(senha, usuario.password):
                    # Retorna os dados do usuário, exceto a senha
                    return Response({
                        "id": usuario.id,
                        "nome": usuario.first_name, # Use first_name ou o campo que estiver usando para o nome
                        "email": usuario.email,
                        "nivel_acesso": usuario.nivel_acesso
                    }, status=200)
                else:
                    return Response({"erro": "Credenciais inválidas"}, status=401)
            
            except Usuario.DoesNotExist:
                return Response({"erro": "Usuário não encontrado"}, status=404)

        return Response(serializer.errors, status=400)