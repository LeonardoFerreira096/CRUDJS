/**
 * Nome do arquivo: prisma
 * Data de criação: 05/12/24
 * Autor: Leonardo Costa Ferreira
 * Matrícula: 01738044
 *
 * Descrição: Configuração otimizada do Prisma Client com Singleton
 *
 * Funcionalidades: Evita múltiplas conexões ao banco (resolve lentidão)
 */

import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("A variável de ambiente DATABASE_URL não está definida.");
}


let prisma;

if (process.env.NODE_ENV === 'production') {
    
    prisma = new PrismaClient({
        log: ['error'], 
    });
} else {
    
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query', 'error', 'warn'], 
            errorFormat: 'pretty', 
        });
    }
    prisma = global.prisma;
}


export async function testConnection() {
    try {
        await prisma.$connect();
        console.log("✅ Banco conectado com sucesso!");
        return true;
    } catch (error) {
        console.error("❌ Erro no banco:", error.message);
        return false;
    }
}


process.on('beforeExit', async () => {
    await prisma.$disconnect();
    console.log("🔌 Conexão com banco fechada");
});

export default prisma;