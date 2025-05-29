from django.db import models
from django.contrib.auth.models import AbstractUser

class NivelAcessoEnum(models.TextChoices):
    ADMIN = 'admin', 'Administrador'
    USUARIO = 'usuario', 'Usuário Comum'

class Usuario(AbstractUser):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=128)  # Armazene senhas criptografadas!
    nivel_acesso = models.CharField(
        max_length=20,
        choices=NivelAcessoEnum.choices,
        default=NivelAcessoEnum.USUARIO
    )

    def __str__(self):
        return self.nome