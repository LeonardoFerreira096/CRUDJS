# 📅 DDE - Sistema de Agendamento

Sistema backend para gerenciamento de agendamentos, com autenticação JWT e integração com banco de dados PostgreSQL via Prisma ORM.

---

## 🚀 Tecnologias

- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **Prisma ORM** - Mapeamento objeto-relacional
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação via token

---

## 🖥️ Frontend

O frontend da aplicação está em um repositório separado:

👉 [DDE - Frontend](https://github.com/LeonardoFerreira096/CRUD_Frontend)

---

## ⚙️ Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e rodando
- npm 

---

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/LeonardoFerreira096/CRUDJS
cd dde

# Instale as dependências
npm install
```

---

## 🔧 Configuração

Crie um arquivo `.env` na raiz do projeto:

```dotenv
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/NOME_DO_BANCO"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

---

## 🗃️ Banco de Dados

```bash
# Gerar o Prisma Client
npx prisma generate

# Aplicar as migrations
npx prisma migrate dev
```

---

## ▶️ Rodando o projeto

```bash
# Desenvolvimento
npm run dev

O servidor estará disponível em: `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
CRUDJS/
├── node_modules/
├── prisma/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   └── services/
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── prisma.config.js
└── README.md 
```

## 📄 Licença

Este projeto está sob a licença leonardo estudante de progamação.

