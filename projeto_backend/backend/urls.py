from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 1. Adicionamos a rota do Admin, que é muito útil
    path('admin/', admin.site.urls),

    # 2. Apontamos todas as rotas que começam com 'api/' para o urls.py do seu app 'api'
    path('api/', include('api.urls')),

    # 3. Apontamos as rotas de produtos para o urls.py do app 'produtos'
    path('api/', include('produtos.urls')),
]