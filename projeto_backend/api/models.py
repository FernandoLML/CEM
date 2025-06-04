from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class NivelAcessoEnum(models.TextChoices):
    ADMIN = 'admin', 'Administrador'
    USUARIO = 'usuario', 'Usuário Comum'

class Usuario(AbstractUser):
    # Remova o campo 'username' pois você quer usar email como login
    username = None
    
    # Use email como identificador único
    email = models.EmailField(_('endereço de email'), unique=True)
    
    # Adicione campos personalizados
    nivel_acesso = models.CharField(
        max_length=20,
        choices=NivelAcessoEnum.choices,
        default=NivelAcessoEnum.USUARIO
    )
    
    # Defina o campo de autenticação
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Remova 'email' dos required fields

    # Adicione related_name personalizado para evitar conflitos
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="custom_user_set",  # Nome personalizado
        related_query_name="custom_user",
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="custom_user_set",  # Nome personalizado
        related_query_name="custom_user",
    )

    def __str__(self):
        return self.email