from django.db import models
from api.models import Usuario # Importa o modelo de usuário do seu outro app

class Fornecedor(models.Model):
    # O Django cria o 'id_fornecedor' automaticamente como 'id'
    nome = models.CharField(max_length=255)
    endereco = models.CharField(max_length=255, blank=True, null=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.nome

class TipoDeMadeira(models.Model):
    # O Django cria o 'id_tipo' automaticamente como 'id'
    nome = models.CharField(max_length=100, unique=True)
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome

class Produto(models.Model):
    # O Django cria o 'id_produto' automaticamente como 'id'
    nome = models.CharField(max_length=255)
    dimensoes_comprimento = models.DecimalField(max_digits=10, decimal_places=2, help_text="Comprimento em metros")
    dimensoes_largura = models.DecimalField(max_digits=10, decimal_places=2, help_text="Largura em metros")
    utilizacao = models.CharField(max_length=255, blank=True, null=True)
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.PROTECT, related_name='produtos')
    tipo_de_madeira = models.ForeignKey(TipoDeMadeira, on_delete=models.PROTECT, related_name='produtos')
    condicao = models.CharField(max_length=255, blank=True, null=True, help_text="Descrição da condição do produto (ex: novo, usado, etc.)")
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text="Valor do produto em R$")

    def __str__(self):
        return f"{self.nome} ({self.dimensoes_comprimento}x{self.dimensoes_largura}m)"

class Estoque(models.Model):
    # Relação um-para-um: cada produto tem exatamente uma entrada no estoque.
    produto = models.OneToOneField(Produto, on_delete=models.CASCADE, primary_key=True)
    # Este campo armazenará a quantidade calculada para leituras rápidas.
    quantidade = models.IntegerField(default=0, editable=False)

    def __str__(self):
        return f"Estoque de {self.produto.nome}: {self.quantidade}"

class MovimentacaoEstoque(models.Model):
    class TipoMovimentacao(models.TextChoices):
        ENTRADA = 'ENTRADA', 'Entrada'
        SAIDA = 'SAIDA', 'Saída'
        AJUSTE = 'AJUSTE', 'Ajuste'

    # O Django cria o 'id_movimentacao' automaticamente como 'id'
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE, related_name='movimentacoes')
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='movimentacoes')
    tipo_movimentacao = models.CharField(max_length=10, choices=TipoMovimentacao.choices)
    quantidade = models.IntegerField() # Pode ser positivo (entrada) ou negativo (saída)
    data_movimentacao = models.DateTimeField(auto_now_add=True)
    observacoes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tipo_movimentacao} de {self.quantidade} no produto {self.produto.nome}"