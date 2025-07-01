from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):

    # Redefinimos o campo de email para garantir que ele seja único
    email = models.EmailField(unique=True)


    nivel_acesso = models.CharField(max_length=5, choices=[('admin', 'Administrador'), ('user', 'Usuário')])
    USERNAME_FIELD = 'email'
    
    # CORREÇÃO: Remova 'username' dos campos requeridos.
    # Deixe a lista vazia, pois o email já é o campo principal.
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email