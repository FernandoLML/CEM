from django.db import models

class Usuario(models.Model):
    NIVEL_ACESSO_CHOICES = [
        ('admin', 'Administrador'),
        ('comum', 'Usuário Comum'),
    ]

    id_usuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=128)
    nivel_acesso = models.CharField(max_length=20, choices=NIVEL_ACESSO_CHOICES)

    def __str__(self):
        return self.nome