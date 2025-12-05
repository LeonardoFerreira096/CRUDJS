import { Router } from 'express';
import authController from '../controllers/authController.js';
import { verificaToken, verificaRole } from '../middleware/authMiddleware.js';
import { createClient } from '../controllers/clientController.js';
import funcionarioController from '../controllers/funcionarioController.js';

const router = Router();

// LOGIN
router.post('/login', authController.login);

// REGISTRO DE CLIENTE
router.post('/register/cliente', createClient);

// REGISTRO DE FUNCIONÁRIO (somente admin)
router.post(
  '/register/funcionario',
  verificaToken,
  verificaRole('admin'),
  funcionarioController.create
);

// UTILIDADES DE TOKEN
router.get('/verificar', verificaToken, authController.verificarToken);
router.post('/logout', verificaToken, authController.logout);

export default router;
