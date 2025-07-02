import pytest
from rest_framework.test import APIClient
from .models import Produto, Fornecedor, TipoDeMadeira, MovimentacaoEstoque, Estoque

@pytest.mark.django_db
def test_criar_produto_autenticado(api_client_admin, admin_user):
    """
    Verifica se um usuário autenticado (admin) pode criar um produto.
    """
    # Dados pré-requisito
    fornecedor = Fornecedor.objects.create(nome="Fornecedor Teste", email="fornecedor@teste.com")
    tipo_madeira = TipoDeMadeira.objects.create(nome="Pinus")

    data = {
        "nome": "Caibro de Pinus",
        "dimensoes_comprimento": "3.00",
        "dimensoes_largura": "0.05",
        "valor": "25.50",
        "condicao": "Novo",
        "fornecedor": fornecedor.id,
        "tipo_de_madeira": tipo_madeira.id
    }
    
    response = api_client_admin.post("/api/produtos/", data)
    assert response.status_code == 201
    assert Produto.objects.filter(nome="Caibro de Pinus").exists()

@pytest.mark.django_db
def test_nao_criar_produto_sem_autenticacao():
    """
    Verifica se um usuário não autenticado NÃO pode criar um produto.
    """
    client = APIClient()
    # Assume que os dados pré-requisito existem, mas a requisição não tem token
    response = client.post("/api/produtos/", {"nome": "Produto Fantasma"})
    
    # Como não protegemos a ProdutoViewSet ainda, este teste pode falhar.
    # Adicione `permission_classes = [permissions.IsAuthenticated]` na ProdutoViewSet
    # para que este teste passe.
    assert response.status_code == 401

@pytest.mark.django_db
def test_dashboard_stats(api_client_admin):
    """Verifica se o endpoint do dashboard responde corretamente."""
    response = api_client_admin.get("/api/dashboard-stats/")
    assert response.status_code == 200
    # Verifica se a estrutura principal da resposta está correta
    assert 'stats' in response.data
    assert 'top_produtos' in response.data
    assert 'fornecedores_recentes' in response.data


@pytest.mark.django_db
def test_sinal_atualiza_estoque_apos_movimentacao(admin_user):
    """
    Verifica se o sinal post_save/post_delete da MovimentacaoEstoque
    está atualizando corretamente o modelo Estoque.
    """
    # Cenário inicial
    fornecedor = Fornecedor.objects.create(nome="Fornecedor Sinal", email="sinal@teste.com")
    tipo = TipoDeMadeira.objects.create(nome="Sinal Wood")
    produto = Produto.objects.create(
        nome="Produto Sinal",
        dimensoes_comprimento="1", dimensoes_largura="1", valor="10",
        fornecedor=fornecedor, tipo_de_madeira=tipo
    )

    # Verifica se o estoque inicial (criado pelo sinal) é 0
    estoque_inicial = Estoque.objects.get(produto=produto)
    assert estoque_inicial.quantidade == 0

    # Cria uma movimentação de ENTRADA
    mov1 = MovimentacaoEstoque.objects.create(
        produto=produto,
        tipo_movimentacao='ENTRADA',
        quantidade=50,
        usuario=admin_user
    )
    # O sinal deve ter atualizado o estoque para 50
    estoque_apos_entrada = Estoque.objects.get(produto=produto)
    assert estoque_apos_entrada.quantidade == 50

    # Cria uma movimentação de SAÍDA
    mov2 = MovimentacaoEstoque.objects.create(
        produto=produto,
        tipo_movimentacao='SAIDA',
        quantidade=-10, # Saídas são negativas
        usuario=admin_user
    )
    # O sinal deve ter recalculado o total para 40 (50 - 10)
    estoque_apos_saida = Estoque.objects.get(produto=produto)
    assert estoque_apos_saida.quantidade == 40

    # Deleta a movimentação de saída
    mov2.delete()
    # O sinal de post_delete deve ser acionado, e o estoque deve voltar para 50
    estoque_apos_delete = Estoque.objects.get(produto=produto)
    assert estoque_apos_delete.quantidade == 50