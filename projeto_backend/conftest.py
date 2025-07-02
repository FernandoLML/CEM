import pytest
from rest_framework.test import APIClient
from api.models import Usuario

@pytest.fixture
def user_factory(db):
    def create_user(email, password="password123", first_name="Test", last_name="User", nivel_acesso="user", is_staff=False):
        return Usuario.objects.create_user(
            email=email,
            username=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            nivel_acesso=nivel_acesso,
            is_staff=is_staff
        )
    return create_user

@pytest.fixture
def admin_user(user_factory):
    return user_factory(
        email="admin@test.com",
        first_name="Admin",
        nivel_acesso="admin",
        is_staff=True
    )

@pytest.fixture
def api_client_admin(admin_user):
    client = APIClient()
    client.force_authenticate(user=admin_user)
    return client