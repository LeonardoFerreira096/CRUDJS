import { PrismaClient } from '@prisma/client';

const prisma = PrismaClient();

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log(" Banco conectado com sucesso!")
    return true;
  } catch (error) {
    console.error(" Erro no banco:", error.message);
    return false;
  }
}

export default prisma;



