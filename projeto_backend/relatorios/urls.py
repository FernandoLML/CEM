from django.urls import path
from .views import GerarRelatorioMovimentacaoView, MesesMovimentacaoView

urlpatterns = [
    # A URL será /api/relatorios/gerar-movimentacao/
    path('gerar-movimentacao/<int:ano>/<int:mes>/', GerarRelatorioMovimentacaoView.as_view(), name='gerar-relatorio-movimentacao'),
    
    # --- ROTA NOVA PARA LISTAR OS MESES ---
    path('meses-disponiveis/', MesesMovimentacaoView.as_view(), name='meses-disponiveis'),

    
]