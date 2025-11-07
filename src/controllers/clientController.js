// src/controllers/clientController.js
import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';

export async function createClient(req, res) {
  try {
    const { nome, email, senha, endereco, telefone } = req.body;

   
    const existingClient = await prisma.cliente.findUnique({ 
      where: { email }
    });

    if (existingClient) {
      return res.status(400).json({ 
        message: 'Email já cadastrado' 
      });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const client = await prisma.cliente.create({ 
      data: {
        nome,
        email,
        senha: hashedPassword,
        endereco,
        telefone
      }
    });

    res.status(201).json({
      message: 'Cliente criado com sucesso!',
      client: {
        id: client.id,
        nome: client.nome,
        email: client.email,
        endereco: client.endereco,
        telefone: client.telefone
      }
    });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}


export async function loginClient(req, res) {
  try {
    const { email, senha } = req.body;

    const client = await prisma.cliente.findUnique({ 
      where: { email }
    });

    if (!client) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    const passwordOk = await bcrypt.compare(senha, client.senha);

    if (!passwordOk) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    res.json({
      message: `Bem-vindo, ${client.nome}!`,
      client: {
        id: client.id,
        nome: client.nome,
        email: client.email,
        endereco: client.endereco,
        telefone: client.telefone
      }
    });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function getAllClients(req, res) {
  try {
    const clients = await prisma.cliente.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        endereco: true,
        telefone: true,
        createdAt: true
      }
    });

    res.json({ clients });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function getClientById(req, res) {
  try {
    const { id } = req.params;

    const client = await prisma.cliente.findUnique({  
      where: { id: parseInt(id) },
      select: {
        id: true,
        nome: true,
        email: true,
        endereco: true,
        telefone: true
      }
    });

    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    res.json({ client });

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function updateClient(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, endereco, telefone } = req.body;

    const client = await prisma.cliente.update({ 
      where: { id: parseInt(id) },
      data: {
        nome,
        email,
        endereco,
        telefone
      }
    });

    res.json({
      message: 'Cliente atualizado!',
      client: {
        id: client.id,
        nome: client.nome,
        email: client.email,
        endereco: client.endereco,
        telefone: client.telefone
      }
    });

  } catch (error) {
    console.error('Erro:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    res.status(500).json({ message: 'Erro no servidor' });
  }
}

export async function deleteClient(req, res) {
  try {
    const { id } = req.params;

    await prisma.cliente.delete({  
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Cliente deletado!' });

  } catch (error) {
    console.error('Erro:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    
    res.status(500).json({ message: 'Erro no servidor' });
  }
}