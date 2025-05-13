from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'email', 'senha', 'nivel_acesso']
        extra_kwargs = {'senha': {'write_only': True}}  # Oculta a senha em respostas