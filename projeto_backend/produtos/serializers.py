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

    quantidade_em_estoque = serializers.IntegerField(source='estoque.quantidade', read_only=True, default=0)

    class Meta:
        model = Produto
        fields = ['id', 
            'nome', 
            'dimensoes_comprimento', 
            'dimensoes_largura', 
            'utilizacao',
            'condicao', 
            'valor', 
            'fornecedor',               # ID do fornecedor (para escrita)
            'tipo_de_madeira',          # ID do tipo de madeira (para escrita)
            'fornecedor_nome',          # Nome (apenas leitura)
            'tipo_de_madeira_nome',     # Nome (apenas leitura)
            'quantidade_em_estoque'     # Quantidade (apenas leitura) ## TESTE: Verificar se inclui o campo quantidade_em_estoque
        ]

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