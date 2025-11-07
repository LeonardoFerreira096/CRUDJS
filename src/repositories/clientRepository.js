import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findClientByEmail(email) {
  return await prisma.cliente.findUnique({
    where: { email: email.toLowerCase() },
  });
}

export async function createClient(data) {
  return await prisma.cliente.create({
    data: {
      nome: data.nome,
      cpfCnpj: data.cpfCnpj || null, 
      logradouro: data.logradouro || null,
      numero: data.numero || null,
      complemento: data.complemento || null,
      bairro: data.bairro || null,
      cidade: data.cidade || null,
      estado: data.estado || null,
      cep: data.cep || null,
      telefone: data.telefone,
      email: data.email,
      senha: data.senha,
   
    },
  });
}