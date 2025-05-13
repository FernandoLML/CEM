from django.db import models

class NivelAcessoEnum(models.TextChoices):
    ADMIN = 'admin', 'Administrador'
    USUARIO = 'usuario', 'Usuário Comum'

class Usuario(models.Model):
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