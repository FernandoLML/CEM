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

# Crie serializers para Estoque e MovimentacaoEstoque de forma similar