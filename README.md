# Sistema de Gestão de Ordens de Serviço

## 📁 Arquitetura
```
src/
├── controllers/     # Camada HTTP - recebe requisições
├── services/        # Lógica de negócio e validações
├── repositories/    # Acesso ao banco de dados (Prisma)
├── routes/          # Definição de endpoints da API
├── middleware/      # Interceptadores (autenticação, etc)
└── config/          # Configurações (Prisma Client)
```

## 🔐 Segurança

- Senhas criptografadas com bcrypt (12 rounds)
- Validação de email único
- Separação de responsabilidades

## 🚀 Como rodar
```bash
npm install
npx prisma migrate dev
npm run dev
```

## 🛠️ Tecnologias

- Node.js + Express
- PostgreSQL + Prisma ORM
- bcryptjs para hash de senhas