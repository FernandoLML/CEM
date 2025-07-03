from locust import HttpUser, task, between

class WebsiteUser(HttpUser):

    host = "http://127.0.0.1:8000"

    wait_time = between(1, 5)  # Usuário espera entre 1 e 5 segundos entre as tarefas
    token = None
    headers = {}
    
    def on_start(self):
        """
        Esta função é executada uma vez por usuário virtual, no início do teste.
        Ideal para fazer o login e obter o token de autenticação.
        """
        # Use um usuário admin que você já tenha cadastrado no seu banco de dados
        credentials = {
            "email": "Xandre@xaruto.com",
            "senha": "xandao"
        }
        try:
            with self.client.post("/api/login/", json=credentials, catch_response=True) as response:
                if response.status_code == 200:
                    self.token = response.json().get('token')
                    self.headers = {'Authorization': f'Token {self.token}'}
                    response.success()
                else:
                    response.failure(f"Could not log in: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Login failed: {e}")


    @task(3) # A tarefa de consultar o dashboard é 3x mais provável de ser executada
    def consultar_dashboard(self):
        """Simula um usuário visualizando o dashboard."""
        if self.token:
            self.client.get("/api/dashboard-stats/", headers=self.headers)

    @task(2) # A tarefa de listar produtos é 2x mais provável
    def listar_produtos(self):
        """Simula um usuário consultando a lista de produtos."""
        if self.token:
            self.client.get("/api/produtos/", headers=self.headers)
    
    @task(1) # A tarefa de cadastrar é a menos frequente
    def cadastrar_produto(self):
        """Simula um usuário cadastrando um novo produto."""
        if self.token:
            # Dados de exemplo para o novo produto
            produto_data = {
                "nome": "Viga de Teste Locust",
                "dimensoes_comprimento": "5.00",
                "dimensoes_largura": "0.15",
                "valor": "150.75",
                "condicao": "Nova",
                "fornecedor": 1, 
                "tipo_de_madeira": 1 
            }
            self.client.post("/api/produtos/", json=produto_data, headers=self.headers)