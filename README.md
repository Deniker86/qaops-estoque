\# 🛠️ Projeto QAOps - Controle de Estoque



Este é um projeto de portfólio com foco em \*\*QAOps\*\*, demonstrando um fluxo completo de testes automatizados e integração de serviços com Docker.



---



\## 🚀 Tecnologias e Ferramentas



\* \*\*Backend\*\*: Python (Flask)

\* \*\*Frontend\*\*: React

\* \*\*Testes Frontend\*\*: Cypress

\* \*\*Testes Backend\*\*: Pytest

\* \*\*Docker \& Docker Compose\*\*

\* \*\*Git \& GitHub\*\*



---



\## 📦 Como Executar o Projeto



Siga os passos abaixo para colocar o projeto em funcionamento:



1\.  \*\*Clone este repositório:\*\*

&nbsp;   ```bash

&nbsp;   git clone \[https://github.com/Deniker86/qaops-estoque.git](https://github.com/Deniker86/qaops-estoque.git)

&nbsp;   cd qaops-estoque

&nbsp;   ```



2\.  \*\*Suba os serviços com Docker:\*\*

&nbsp;   ```bash

&nbsp;   docker-compose up --build

&nbsp;   ```



&nbsp;   Este comando irá iniciar os seguintes serviços:



&nbsp;   \* O \*\*backend Flask\*\* na porta `5000`

&nbsp;   \* O \*\*frontend React\*\* na porta `3000`

&nbsp;   \* Os \*\*testes automatizados\*\* (Cypress e Pytest)



&nbsp;   Aguarde até que todos os testes sejam executados automaticamente.



---



\## 🧪 Testes Automatizados



\### Frontend (Cypress)



Os testes E2E (End-to-End) são executados automaticamente assim que o frontend estiver disponível. Eles verificam:



\* Acessibilidade da página

\* Funcionalidade de cadastro, edição e remoção de produtos



\### Backend (Pytest)



Testes unitários e de integração são executados assim que o serviço do backend for iniciado.



---



\## 📁 Estrutura do Projeto



```bash

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

