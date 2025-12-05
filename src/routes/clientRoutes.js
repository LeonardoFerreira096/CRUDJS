// src/routes/clientRoutes.js (Limpo)
import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';
import { verificaToken, verificaRole } from '../middleware/authMiddleware.js';

const router = Router();

// Protege todas as rotas de gerenciamento de clientes com autenticação
// E restringe ao Admin ou ao próprio Cliente (lógica no middleware, se necessário)
router.use(verificaToken);

// Rotas de gerenciamento de clientes
router.get('/', verificaRole('admin'), getAllClients); // Apenas Admin vê todos
router.get('/:id', getClientById); // Pode ser acessado pelo Admin ou pelo próprio Cliente
router.put('/:id', updateClient);
router.delete('/:id', verificaRole('admin'), deleteClient); // Apenas Admin deleta

export default router;