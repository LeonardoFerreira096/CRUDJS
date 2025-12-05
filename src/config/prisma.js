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

// SINGLETON PATTERN - Evita múltiplas instâncias
let prisma;

if (process.env.NODE_ENV === 'production') {
    // Em produção: uma instância única
    prisma = new PrismaClient({
        log: ['error'], // Apenas erros
    });
} else {
    // Em desenvolvimento: reutiliza instância global
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query', 'error', 'warn'], // Logs detalhados para debug
            errorFormat: 'pretty', // Erros mais legíveis
        });
    }
    prisma = global.prisma;
}

// Função de teste de conexão
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

// Graceful shutdown - fecha conexão ao desligar servidor
process.on('beforeExit', async () => {
    await prisma.$disconnect();
    console.log("🔌 Conexão com banco fechada");
});

export default prisma;