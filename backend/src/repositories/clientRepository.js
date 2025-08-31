import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export function findClientByEmail(email) {
  return prisma.cliente.findUnique({
    where: { email },
  });
}


export function createClient(data) {
  return prisma.cliente.create({
    data,
  });
}
