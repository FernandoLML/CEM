import pytest
from rest_framework.test import APIClient
from api.models import Usuario, NivelAcessoEnum

@pytest.mark.django_db
def test_criacao_usuario_publico():
    client = APIClient()
    data = {
        "nome": "Usuário Público",
        "email": "publico@email.com",
        "senha": "12345678",
        "nivel_acesso": "admin"  # Tentativa de forçar admin
    }
    response = client.post("/api/usuarios/", data)
    assert response.status_code == 201
    usuario = Usuario.objects.get(email="publico@email.com")
    assert usuario.nivel_acesso == NivelAcessoEnum.USUARIO  # Deveria ser convertido

@pytest.mark.django_db
def test_listagem_usuarios_autenticado():
    usuario = Usuario.objects.create(
        nome="Usuário X",
        email="x@email.com",
        senha="123",
        nivel_acesso=NivelAcessoEnum.USUARIO
    )
    client = APIClient()
    client.force_authenticate(user=usuario)
    response = client.get("/api/usuarios/")
    assert response.status_code == 200

@pytest.mark.django_db
def test_listagem_usuarios_sem_autenticacao():
    client = APIClient()
    response = client.get("/api/usuarios/")
    assert response.status_code == 401

@pytest.mark.django_db
def test_exclusao_usuario_somente_admin():
    admin = Usuario.objects.create(
        nome="Admin",
        email="admin@email.com",
        senha="123",
        nivel_acesso=NivelAcessoEnum.ADMIN
    )
    usuario = Usuario.objects.create(
        nome="Para Deletar",
        email="delete@email.com",
        senha="123",
        nivel_acesso=NivelAcessoEnum.USUARIO
    )
    client = APIClient()
    client.force_authenticate(user=admin)
    response = client.delete(f"/api/usuarios/{usuario.id}/")
    assert response.status_code == 204