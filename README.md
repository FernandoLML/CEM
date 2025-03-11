# CEM - Controle de Estoque para Madeireira
---
## Escopo do Projeto 
**Definição do Escopo**
O projeto consiste no desenvolvimento de um sistema web para controle de estoque voltado para uma madeireira que comercializa madeira para construção.

A aplicação permitirá o gerenciamento eficiente das mercadorias, facilitando a entrada e saída de produtos, o rastreamento de estoque, e fornecendo relatórios detalhados para tomada de decisão.

### Objetivo do Projeto
Desenvolver um software de controle de estoque acessível via web, proporcionando eficiência operacional, redução de desperdícios e maior controle sobre o abastecimento e reposição de madeira.

---

### Stakeholders Envolvidos
* **Proprietário da Madeireira** → Acompanha o estoque e toma decisões de compra.

* **Funcionários** → Registra entradas e saídas de madeira.

* **Fornecedor** → Responsável por abastecer os produtos.

* **Equipe de Desenvolvimento** → Desenvolve e mantém o sistema.

---

### Funcionalidades Principais
#### Cadastro de Produtos e Fornecedores
* Permite o cadastro e edição de tipos de madeira, dimensões, preço padrão, condição e fornecedores.

#### Entrada e Saída de Estoque
* Registra adicionamento e retirada de produtos com um histórico detalhado de movimentações.

#### Aviso de Estoque Baixo
* Emite notificações automáticas quando o estoque atingir um nível crítico.

#### Relatórios Semanais
  * Geração automática de relatórios gerenciais, incluindo:
  * Madeira mais vendida
  * Produtos com menor e maior quantidade em estoque
  * Histórico de movimentações
    
#### Filtros Avançados para Consulta
* Usuários podem pesquisar e filtrar itens no estoque por:
  * Tipo de madeira
  * Fornecedor
  * Dimensões
  * Data da última movimentação
    
#### Controle de Quantidades
 * Interface intuitiva para adicionar e remover produtos do estoque, com logs para auditoria.

---

### **Histórias de Usuário**
**História de Usuário 1: Cadastro de Produtos**

- **Como**: Administrador da madeireira
- **Eu quero**: Cadastrar novos produtos com detalhes como tipo de madeira, dimensões, quantidade e fornecedor
- **Para que**: Eu possa realizar consultas eficientes sobre os produtos na empresa
- **Critérios de Aceitação**:

1. O sistema deve permitir o cadastro de produtos com campos obrigatórios para tipo de madeira, dimensões, quantidade e fornecedor.
2. O sistema deve validar o preenchimento correto dos campos.
3. O administrador deve poder consultar os produtos cadastrados posteriormente.

**História de Usuário 2: Registro de Entrada e Saída de Produtos**

- **Como**: Administrador da madeireira
- **Eu quero**: Registrar a entrada e saída de produtos
- **Para que**: Eu possa manter o controle das quantidades disponíveis no estoque
- **Critérios de Aceitação**:

1. O sistema deve permitir o registro da quantidade de produtos que entram e saem do estoque.
2. O sistema deve atualizar automaticamente a quantidade disponível após cada registro.

**História de Usuário 3: Atualização Rápida das Informações**

- **Como**: Administrador da madeireira
- **Eu quero**: Que o sistema atualize as informações em menos de 4 segundos
- **Para que**: A eficiência do sistema seja garantida
- **Critérios de Aceitação**:

1. O sistema deve responder em até 4 segundos para qualquer atualização de dados.

**História de Usuário 4: Aviso de Estoque Baixo**

- **Como**: Administrador da madeireira
- **Eu quero**: Que o sistema gere um aviso quando algum produto estiver com uma quantidade mínima
- **Para que**: Eu possa começar a repor o estoque antes que acabe
- **Critérios de Aceitação**:

1. O sistema deve permitir definir uma quantidade mínima para cada produto.
2. Quando o produto atingir essa quantidade, um aviso deve ser gerado.
3. O aviso deve ser visual e/ou por e-mail, conforme configuração.

**História de Usuário 5: Desligar Aviso de Estoque Baixo**

- **Como**: Administrador da madeireira
- **Eu quero**: Que o sistema permita desligar o aviso de estoque baixo
- **Para que**: Eu possa gerenciar os avisos conforme a situação da empresa
- **Critérios de Aceitação**:

1. O sistema deve ter uma opção para o administrador desativar o aviso de estoque baixo.
2. O administrador deve poder reativar o aviso quando necessário.

**História de Usuário 6: Geração de Relatórios**

- **Como**: Administrador da madeireira
- **Eu quero**: Que o sistema gere relatórios mensais de vendas e movimentação do estoque
- **Para que**: Eu possa tomar decisões informadas sobre reposição de produtos
- **Critérios de Aceitação**:

1. O sistema deve gerar relatórios de vendas e movimentação semanalmente.
2. O relatório deve ser exportável em formatos como Excel e PDF.

**História de Usuário 7: Interface Intuitiva**

- **Como**: Funcionário da madeireira
- **Eu quero**: Que o sistema tenha uma interface intuitiva e de fácil navegação
- **Para que**: Eu possa utilizá-lo com treinamento mínimo
- **Critérios de Aceitação**:

1. O sistema deve possuir uma interface gráfica amigável.
2. As funcionalidades principais devem ser acessíveis em até 3 cliques.

**História de Usuário 8: Histórico de Movimentação**

- **Como**: Administrador da madeireira
- **Eu quero**: Que o sistema tenha um histórico de entrada e saída de produtos dos últimos 30 dias
- **Para que**: Eu possa balancear o caixa do mês
- **Critérios de Aceitação**:

1. O sistema deve manter um histórico detalhado das movimentações de estoque dos últimos 30 dias.
2. O histórico deve ser consultável e exportável.
   
---

### **Requisitos Funcionais (RF)**

1️. **RF01** O sistema deve permitir o cadastro de produtos, incluindo nome, tipo de madeira, fornecedor, dimensões, preço e condição do produto.

2️. **RF02** O sistema deve registrar os dados de entrada e saída dos produtos, incluindo data, quantidade e usuário responsável pela movimentação.

3️. **RF03** O sistema deve emitir um aviso automático de estoque baixo quando um produto atingir um nível mínimo pré-definido.

4️. **RF04** O sistema deve oferecer um filtro avançado para a busca de produtos por tipo de madeira, fornecedor, dimensões, preço e status de estoque.

5️. **RF05** O sistema deve permitir que o usuário exclua e altere produtos cadastrados, com log de alterações para auditoria.

6️. **RF06** O sistema deve permitir o cadastro de usuários com níveis de acesso diferenciados (exemplo: administrador e funcionário).

7️. **RF07** O sistema deve gerar relatórios detalhados contendo dados de movimentação do estoque, vendas e histórico de produtos.

---

### **Requisitos Não Funcionais (RNF)**

1. **RNF01** O sistema deve atualizar as informações em **menos de 30 segundos** após qualquer ação do usuário.

2️. **RNF02** O sistema deve permitir que usuários autorizados ativem ou desativem o aviso de estoque baixo.

3️. **RNF03** O sistema deve possuir uma interface intuitiva e de simples navegação, seguindo princípios de UX/UI design.

4️. **RNF04** O sistema deve registrar o histórico completo de entradas e saídas dos últimos 6 meses, garantindo a recuperação de dados para auditorias.

5️. **RNF05** O sistema deve possuir um recurso de backup automático diário, armazenando os dados em um local seguro.

6️. **RNF06** O sistema deve garantir funcionamento contínuo, com tolerância a falhas e redundância nos dados para evitar perda de informações.

7️. **RNF07** O sistema deve gerar relatórios mensais detalhados de vendas e movimentação de estoque.

8️. **RNF08** O sistema deve permitir a exportação de tabelas e relatórios em formatos como Excel (.xlsx) e PDF.

---

## Arquitetura escolhida:
 * Monolítica
   * Devido ao sistema não exigir muitos usuários
   * Não terá muitos times trabalhando
   * É um projeto de pequeno porte não tem a necessidade de escalabilidade extrema
   * Mais fácil e rápido de desenvolver
     
---

## Tecnologias escolhidas:
  * Frontend: React (com React Query).
    *   Alta reatividade
    *   Componentização: facilita a manutenção 
    *   Suporte amplo
    *   Curva de aprendizado mais rápida
    *   Melhor desempenho para atualizações em tempo real 
  * Backend: Django (Python) (Channels e WebSockets .
    * Facilita a criação da API
    * Autenticação embutida
    * Ótima integração com PostgreSQL
  * Banco de Dados: PostgreSQL.
    * Desempenho
    * Boa integração com Django

---

 ## Atividades:
## Fernando (Responsável por):

* Reunião com a madeireira para confirmar o conteúdo da página inicial.
* Confirmar e alinhar o conteúdo da página inicial com o cliente.
* Criação de um documento com os requisitos.
* Documentar todos os requisitos funcionais e não funcionais do projeto.
* Configurar o repositório do GitHub.
* Criar e organizar o repositório, definir a estrutura inicial.
* Implantação e publicação do site.
* Realizar o deploy do site em ambiente de produção.
* Teste de implementação no banco de dados.
* Garantir que as implementações do banco de dados estejam funcionando corretamente.
* Confirmação do design com o cliente.
* Verificar se o design está de acordo com as expectativas do cliente.

## Bruno (Responsável por):
* Definir cronograma das sprints


* Organizar o tempo para cada sprint e definir as metas a serem alcançadas.
* Configuração Backend


* Configurar o ambiente e estrutura de backend necessários para o projeto.
* Banco de dados
* Criar e configurar o banco de dados conforme os requisitos do sistema.
* Configuração e organização do projeto em React
* Organizar a estrutura do projeto React e configurar as dependências iniciais.
* Testes e Ajustes
* Realizar testes de qualidade, ajustando os pontos necessários no código.
* Teste de API REST
* Testar as funcionalidades da API REST e validar as integrações.
* Criação de Sprints
* Criar e organizar as sprints no sistema de gestão de projetos (ex: Jira, Trello).

## Ambos (Responsáveis por):

* Prototipagem e Design
* Colaborar na criação do protótipo e design do site.
* Desenvolvimento Front-end
* Trabalhar no desenvolvimento das interfaces de usuário no React.
* Definição de arquitetura
* Definir a arquitetura geral do sistema (frontend, backend, banco de dados).

    


