import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import prisma, { testConnection } from './src/config/prisma.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//  IMPORTAR ROTAS 
import authRoutes from './src/routes/authRoutes.js';
import clientRoutes from './src/routes/clientRoutes.js';
import ordemServicoRoutes from './src/routes/ordemServicoRoutes.js';
import funcionarioRoutes from './src/routes/funcionarioRoutes.js';

//  REGISTRAR ROTAS
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientRoutes);
app.use('/api/ordens-servico', ordemServicoRoutes);
app.use('/api/funcionarios', funcionarioRoutes); 


app.get('/', (req, res) => {
    res.json({
        message: 'API de Sistema de Agendamento',
        version: '1.0.0',
        endpoints: {
            clientes: '/api/clientes',
            ordensServico: '/api/ordens-servico',
            funcionarios: '/api/funcionarios' 
        }
    });
});



app.use((err, req, res, next) => {
    console.error('ERRO INTERNO:', err.stack); 

    if (err.name === 'PrismaClientKnownRequestError') {
        return res.status(400).json({ error: 'Erro de Requisição no Banco de Dados', message: err.message });
    }
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: err.message
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
    console.log('⏳ Verificando conexão com o DB...');

    const isConnected = await testConnection();

    if (isConnected) {
        app.listen(PORT, () => {
            console.log(`\n🚀 Servidor de Agendamento rodando em: http://localhost:${PORT}`);
        });
    } else {
        console.error('\n❌ Falha ao conectar ao banco. Encerrando o servidor.');
        await prisma.$disconnect();
        process.exit(1);
    }
}

startServer();