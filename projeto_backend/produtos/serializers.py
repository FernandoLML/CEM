from rest_framework import serializers
from .models import Fornecedor, TipoDeMadeira, Produto, Estoque, MovimentacaoEstoque

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'

class TipoDeMadeiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDeMadeira
        fields = '__all__'

class ProdutoSerializer(serializers.ModelSerializer):
    # Para mostrar o nome em vez do ID na resposta da API
    fornecedor_nome = serializers.CharField(source='fornecedor.nome', read_only=True)
    tipo_de_madeira_nome = serializers.CharField(source='tipo_de_madeira.nome', read_only=True)

    class Meta:
        model = Produto
        fields = '__all__'

class EstoqueSerializer(serializers.ModelSerializer):
    # Campo para exibir o nome do produto na API, além do ID
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)

    class Meta:
        model = Estoque
        fields = '__all__'

# --- SERIALIZER DE MOVIMENTAÇÃO DE ESTOQUE ADICIONADO ---
class MovimentacaoEstoqueSerializer(serializers.ModelSerializer):
    # Campos read_only para exibir nomes/emails na listagem da API
    # Isso corresponde exatamente ao que a sua TabelaListagem em movement.jsx espera
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)
    usuario_email = serializers.EmailField(source='usuario.email', read_only=True)

    class Meta:
        model = MovimentacaoEstoque
        fields = '__all__'