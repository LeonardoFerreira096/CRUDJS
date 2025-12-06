import { Router } from 'express';
import authController from '../controllers/authController.js';
import { verificaToken, verificaRole } from '../middleware/authMiddleware.js';
import { createClient } from '../controllers/clientController.js';
import funcionarioController from '../controllers/funcionarioController.js';

const router = Router();


router.post('/login', authController.login);


router.post('/register/cliente', createClient);


router.post(
  '/register/funcionario',
  verificaToken,
  verificaRole('admin'),
  funcionarioController.create
);


router.get('/verificar', verificaToken, authController.verificarToken);
router.post('/logout', verificaToken, authController.logout);

export default router;
