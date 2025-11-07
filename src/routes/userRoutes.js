import express from 'express';
import { 
  createClient, 
  loginClient, 
  getAllClients, 
  getClientById, 
  updateClient, 
  deleteClient 
} from '../controllers/clientController.js';

const router = express.Router();


router.post('/register', createClient);


router.post('/login', loginClient);


router.get('/', getAllClients);


router.get('/:id', getClientById);


router.put('/:id', updateClient);


router.delete('/:id', deleteClient);

export default router;