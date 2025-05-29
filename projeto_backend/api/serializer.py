from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usuario, NivelAcessoEnum

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'senha', 'nivel_acesso']
        extra_kwargs = {'senha': {'write_only': True}}

    def validate_nivel_acesso(self, value):
        request = self.context.get('request')
        
        # Se o usuário não for admin, força o valor padrão 'usuario'
        if not (request and request.user.is_authenticated and request.user.nivel_acesso == 'admin'):
            return NivelAcessoEnum.USUARIO  # Valor padrão
        return value

    def validate_senha(self, value):
        return make_password(value)  # Criptografa a senha