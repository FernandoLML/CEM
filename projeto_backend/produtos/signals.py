from django.db.models.signals import post_save, post_delete
from django.db.models import Sum
from django.dispatch import receiver
from .models import MovimentacaoEstoque, Estoque, Produto

@receiver([post_save, post_delete], sender=MovimentacaoEstoque)
def atualizar_estoque_apos_movimentacao(sender, instance, **kwargs):
    """
    Este sinal é acionado sempre que uma MovimentacaoEstoque é salva ou deletada.
    """
    produto_afetado = instance.produto

    # Calcula o novo total somando todas as movimentações para o produto afetado
    novo_total = MovimentacaoEstoque.objects.filter(produto=produto_afetado).aggregate(
        soma_total=Sum('quantidade')
    )['soma_total'] or 0

    # Atualiza o registro de Estoque ou cria um se não existir
    Estoque.objects.update_or_create(
        produto=produto_afetado,
        defaults={'quantidade': novo_total}
    )

@receiver(post_save, sender=Produto)
def criar_estoque_para_novo_produto(sender, instance, created, **kwargs):
    """
    Este sinal é acionado sempre que um Produto é salvo.
    Se o produto estiver sendo CRIADO, ele garante que um registro
    de Estoque correspondente seja criado.
    """
    if created: # 'created' é True apenas na primeira vez que o objeto é salvo
        Estoque.objects.create(produto=instance)