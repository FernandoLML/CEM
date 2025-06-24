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
    fornecedor_nome = serializers.CharField(source='fornecedor.nome', read_only=True)
    tipo_de_madeira_nome = serializers.CharField(source='tipo_de_madeira.nome', read_only=True)
    
    # Este campo lê o valor da anotação 'quantidade_em_estoque' criada na view.
    quantidade_em_estoque = serializers.IntegerField(read_only=True)

    class Meta:
        model = Produto
        fields = [
            'id', 'nome', 'dimensoes_comprimento', 'dimensoes_largura', 'utilizacao',
            'condicao', 'valor', 'fornecedor', 'tipo_de_madeira',
            'fornecedor_nome', 'tipo_de_madeira_nome',
            'quantidade_em_estoque' # O campo calculado está aqui
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

    # --- MÉTODO CREATE ADICIONADO PARA TRATAR SAÍDAS ---
    def create(self, validated_data):
        """
        Sobrescreve o método de criação para ajustar a quantidade em caso de saída.
        """
        # Se o tipo de movimentação for 'SAIDA', multiplica a quantidade por -1
        if validated_data.get('tipo_movimentacao') == 'SAIDA':
            validated_data['quantidade'] = -abs(validated_data['quantidade'])
        
        # Garante que a quantidade seja positiva para outros tipos, caso o usuário digite um valor negativo
        elif validated_data.get('tipo_movimentacao') == 'ENTRADA':
             validated_data['quantidade'] = abs(validated_data['quantidade'])

        # Cria a movimentação com o valor de quantidade correto
        return super().create(validated_data)