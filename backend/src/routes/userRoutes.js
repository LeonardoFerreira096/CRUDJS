import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
  const { nome, endereco, telefone, email, senha } = req.body;

  try {
    
    const clienteExistente = await prisma.client.findUnique({
      where: { email },
    });

    if (clienteExistente) {
      return res.status(409).json({ mensagem: 'Este e-mail já está cadastrado.' });
    }

    
    const hashedPassword = await bcrypt.hash(senha, 10);


    const novoCliente = await prisma.client.create({
      data: {
        nome,
        endereco,
        telefone,
        email,
        senha: hashedPassword,
      },
    });

    res.status(201).json({ mensagem: `Cliente ${novoCliente.nome} cadastrado com sucesso!` });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar cliente. Por favor, tente novamente.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await prisma.client.findUnique({
      where: { email },
    })

    if (!cliente) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(senha, cliente.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    res.status(200).json({ mensagem: `Login realizado com sucesso! Bem-vindo, ${cliente.nome}!` });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ mensagem: 'Erro ao fazer login. Por favor, tente novamente.' });
  }
})

export default router;