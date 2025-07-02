import pytest
from rest_framework.test import APIClient
from api.models import Usuario

# A marcação @pytest.mark.django_db garante que cada teste use um banco de dados limpo.
@pytest.mark.django_db
def test_criacao_usuario_publico():
    """Verifica se um usuário pode ser criado publicamente."""
    client = APIClient()
    data = {
        "nome": "Usuário Público",
        "email": "publico@email.com",
        "senha": "12345678",
        "nivel_acesso": "user" 
    }
    response = client.post("/api/usuarios/", data)
    assert response.status_code == 201
    assert Usuario.objects.filter(email="publico@email.com").exists()

@pytest.mark.django_db
def test_listagem_usuarios_sem_autenticacao():
    """Verifica se um usuário não autenticado NÃO pode listar outros usuários."""
    client = APIClient()
    response = client.get("/api/usuarios/")
    # O esperado agora é 401 Unauthorized, pois a view está protegida.
    assert response.status_code == 401

@pytest.mark.django_db
def test_listagem_usuarios_somente_admin(admin_user, api_client_admin):
    """Verifica se um usuário admin PODE listar outros usuários."""
    # admin_user e api_client_admin são fixtures que criam e autenticam um admin
    response = api_client_admin.get("/api/usuarios/")
    assert response.status_code == 200
    # O resultado deve conter o próprio admin na lista
    assert len(response.data) > 0
    assert response.data[0]['email'] == admin_user.email

@pytest.mark.django_db
def test_exclusao_usuario_somente_admin(admin_user, api_client_admin, user_factory):
    """Verifica se um admin pode excluir outro usuário."""
    # Cria um usuário comum para ser deletado
    usuario_a_deletar = user_factory(email="paradeletar@email.com")
    
    # O admin faz a requisição para deletar
    response = api_client_admin.delete(f"/api/usuarios/{usuario_a_deletar.id}/")
    
    # A exclusão bem-sucedida retorna 204 No Content
    assert response.status_code == 204
    # Verifica se o usuário realmente foi removido do banco
    assert not Usuario.objects.filter(id=usuario_a_deletar.id).exists()