import bcrypt from 'bcryptjs';
import { findClientByEmail, createClient } from '../repositories/clientRepository.js';


export async function registerUserService(data) {
  const { nome, endereco, telefone, email, senha } = data;


  const clienteExistente = await findClientByEmail(email);

  if (clienteExistente) {
    throw new Error('Este e-mail já está cadastrado.');
  }

 
  const hashedPassword = await bcrypt.hash(senha, 10);


  return await createClient({
    nome,
    endereco,
    telefone,
    email,
    senha: hashedPassword,
  });
}


export async function loginUserService(data) {
  const { email, senha } = data;

  
  const cliente = await findClientByEmail(email);

  if (!cliente) {
    throw new Error('Credenciais inválidas.');
  }


  const isPasswordValid = await bcrypt.compare(senha, cliente.senha);

  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas.');
  }

 
  return cliente;
}