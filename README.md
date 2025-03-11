# CEM - Controle de Estoque para Madeireira
## Escopo do Projeto 
**Definição do Escopo**
O projeto consiste no desenvolvimento de um sistema web para controle de estoque voltado para uma madeireira que comercializa madeira para construção.

A aplicação permitirá o gerenciamento eficiente das mercadorias, facilitando a entrada e saída de produtos, o rastreamento de estoque, e fornecendo relatórios detalhados para tomada de decisão.

### Objetivo do Projeto
Desenvolver um software de controle de estoque acessível via web, proporcionando eficiência operacional, redução de desperdícios e maior controle sobre o abastecimento e reposição de madeira.

### Stakeholders Envolvidos
* **Proprietário da Madeireira** → Acompanha o estoque e toma decisões de compra.

* **Funcionários** → Registra entradas e saídas de madeira.

* **Fornecedor** → Responsável por abastecer os produtos.

* **Equipe de Desenvolvimento** → Desenvolve e mantém o sistema.

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

## Arquitetura escolhida:
 * Monolítica
   * Devido ao sistema não exigir muitos usuários
   * Não terá muitos times trabalhando
   * É um projeto de pequeno porte não tem a necessidade de escalabilidade extrema
   * Mais fácil e rápido de desenvolver

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

 **##Atividades:**
Fernando (Responsável por):
Reunião com a madeireira para confirmar o conteúdo da página inicial


Confirmar e alinhar o conteúdo da página inicial com o cliente.
Criação de um documento com os requisitos


Documentar todos os requisitos funcionais e não funcionais do projeto.
Configurar o repositório do GitHub


Criar e organizar o repositório, definir a estrutura inicial.
Implantação e publicação do site


Realizar o deploy do site em ambiente de produção.
Teste de implementação no banco de dados


Garantir que as implementações do banco de dados estejam funcionando corretamente.
Confirmação do design com o cliente


Verificar se o design está de acordo com as expectativas do cliente.

Bruno (Responsável por):
Definir cronograma das sprints


Organizar o tempo para cada sprint e definir as metas a serem alcançadas.
Configuração Backend


Configurar o ambiente e estrutura de backend necessários para o projeto.
Banco de dados


Criar e configurar o banco de dados conforme os requisitos do sistema.

Configuração e organização do projeto em React


Organizar a estrutura do projeto React e configurar as dependências iniciais.
Testes e Ajustes


Realizar testes de qualidade, ajustando os pontos necessários no código.
Teste de API REST


Testar as funcionalidades da API REST e validar as integrações.
Criação de Sprints


Criar e organizar as sprints no sistema de gestão de projetos (ex: Jira, Trello).

Ambos (Responsáveis por):


Prototipagem e Design
Colaborar na criação do protótipo e design do site.
Desenvolvimento Front-end
Trabalhar no desenvolvimento das interfaces de usuário no React.
Definição de arquitetura
Definir a arquitetura geral do sistema (frontend, backend, banco de dados).

    


