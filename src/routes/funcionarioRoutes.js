/**
 * Nome do arquivo: funcionarioRoutes
 * Data de criação: 05/12/24
 * Autor: Leonardo Costa Ferreira
 * Matrícula: 01738044
 *
 * Descrição: Rotas de funcionários (públicas e protegidas)
 */

import { Router } from 'express';
import funcionarioController from '../controllers/funcionarioController.js';
import { verificaToken, verificaRole } from '../middleware/authMiddleware.js';

const router = Router();



router.post('/register', funcionarioController.create);



router.get('/', verificaToken, verificaRole('admin'), funcionarioController.getAll);


router.get('/:id', verificaToken, verificaRole('admin'), funcionarioController.getById);


router.put('/:id', verificaToken, verificaRole('admin'), funcionarioController.update);


router.delete('/:id', verificaToken, verificaRole('admin'), funcionarioController.delete);

export default router;