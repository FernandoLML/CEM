#from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    id_usuario = serializers.IntegerField(source='pk', read_only=True)
    nome = serializers.CharField(source='first_name')
    email = serializers.EmailField()
    senha = serializers.CharField(
        write_only=True, source='password', style={'input_type': 'password'})
    nivel_acesso = serializers.CharField()

    class Meta:
        model = Usuario
        fields = ['id_usuario', 'nome', 'email', 'senha', 'nivel_acesso']

    # REMOVA O MÉTODO validate_senha COMPLETAMENTE
    # O create_user cuidará da criptografia.
    # def validate_senha(self, value):
    #     return make_password(value)

    # MÉTODO CREATE CORRIGIDO E SIMPLIFICADO
    def create(self, validated_data):
        # A senha recebida aqui está em texto puro, que é o que create_user espera.
        # Os outros campos (first_name, nivel_acesso) são passados normalmente.
        usuario = Usuario.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name'),
            nivel_acesso=validated_data.get('nivel_acesso')
        )
        return usuario