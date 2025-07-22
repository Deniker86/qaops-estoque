\# 🛠️ Projeto QAOps - Controle de Estoque



Este é um projeto de portfólio com foco em \*\*QAOps\*\*, demonstrando um fluxo completo de testes automatizados e integração de serviços com Docker.



\## 🚀 Tecnologias e Ferramentas



\- \*\*Backend\*\*: Python (Flask)

\- \*\*Frontend\*\*: React

\- \*\*Testes Frontend\*\*: Cypress

\- \*\*Testes Backend\*\*: Pytest

\- \*\*Docker \& Docker Compose\*\*

\- \*\*Git \& GitHub\*\*



\## 📦 Como executar o projeto



1\. Clone este repositório:



```bash

git clone https://github.com/Deniker86/qaops-estoque.git

cd qaops-estoque





2\. Suba os serviços com Docker:



docker-compose up --build



Isso irá iniciar:



O backend Flask na porta 5000



O frontend React na porta 3000



Os testes automatizados (Cypress e Pytest)



Aguarde até que todos os testes sejam executados automaticamente.







🧪 Testes Automatizados

Frontend (Cypress)

Os testes E2E são executados automaticamente assim que o frontend estiver disponível. Eles verificam:



Acessibilidade da página



Funcionalidade de cadastro, edição e remoção de produtos



Backend (Pytest)

Testes unitários e de integração são executados assim que o serviço do backend for iniciado.



📁 Estrutura do Projeto



qaops-estoque/

│

├── backend/           # API em Flask

│   └── tests/         # Testes em Pytest

│

├── frontend/          # Interface em React

│   └── cypress/       # Testes em Cypress

│

├── docker-compose.yml # Orquestração dos serviços

└── README.md





🎯 Objetivos do Projeto

Automatizar todo o fluxo de QA com foco em integração contínua



Simular um ambiente real de desenvolvimento colaborativo



Aprender boas práticas modernas com Docker, Git e automação de testes



👨‍💻 Autor

Deniker Pires

Projeto feito com dedicação para estudos e portfólio.

