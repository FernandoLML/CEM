from locust import HttpUser, task

class UserBehavior(HttpUser):
    @task
    def consultar_usuario(self):
        self.client.get("/api/usuarios/")

    @task
    def cadastrar_usuario(self):
        self.client.post("/api/usuarios/", json={
            "nome": "Teste",
            "email": "teste@email.com",
            "senha": "12345678"
        })