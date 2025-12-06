import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';
import { verificaToken, verificaRole } from '../middleware/authMiddleware.js';

const router = Router();


router.use(verificaToken);


router.get('/', verificaRole('admin'), getAllClients); 
router.get('/:id', getClientById); 
router.put('/:id', updateClient);
router.delete('/:id', verificaRole('admin'), deleteClient); 

export default router;