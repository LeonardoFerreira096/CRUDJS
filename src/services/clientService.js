import bcrypt from 'bcryptjs';
import { findClientByEmail, createClient } from '../repositories/clientRepository.js';


export async function registerUserService(data) {
  const { nome, endereco, telefone, email, senha } = data;


  if (!nome || !email || !senha) {
    throw new Error('Nome, email e senha são obrigatórios.');
  }

  const clienteExistente = await findClientByEmail(email);
  if (clienteExistente) {
    throw new Error('Não foi possível completar o cadastro.');
  }

  const hashedPassword = await bcrypt.hash(senha, 12);


  return await createClient({
    nome: nome.trim(),
    logradouro: endereco, 
    telefone: telefone?.trim(),
    email: email.toLowerCase().trim(),
    senha: hashedPassword,
  });
}