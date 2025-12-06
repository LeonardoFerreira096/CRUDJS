import express from 'express';
import ordemServicoController from '../controllers/ordemServicoController.js';
import { verificaToken, verificaRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(verificaToken);


router.post(
  '/cliente/solicitar',
  verificaRole('cliente'),
  ordemServicoController.createByCliente
);

router.get(
  '/cliente/minhas',
  verificaRole('cliente'),
  ordemServicoController.getByCliente
);


router.get(
  '/funcionario/todas',
  verificaRole('funcionario', 'admin'),
  ordemServicoController.getAll
);

router.get(
  '/funcionario/minhas',
  verificaRole('funcionario', 'admin'),
  ordemServicoController.getByFuncionario
);

router.patch(
  '/funcionario/:id/status',
  verificaRole('funcionario', 'admin'),
  ordemServicoController.updateStatusByFuncionario
);


router.get(
  '/clientes',
  verificaRole('funcionario', 'admin'),
  ordemServicoController.getAllClientes
);

router.get(
  '/stats',
  verificaRole('funcionario', 'admin'),
  ordemServicoController.getStats
);

router.post('/admin', verificaRole('admin'), ordemServicoController.create);

router.get('/admin', verificaRole('admin'), ordemServicoController.getAll);

router.get('/admin/:id', verificaRole('admin'), ordemServicoController.getById);

router.put('/admin/:id', verificaRole('admin'), ordemServicoController.update);

router.delete(
  '/admin/:id',
  verificaRole('admin'),
  ordemServicoController.delete
);

router.patch(
  '/admin/:id/status',
  verificaRole('admin'),
  ordemServicoController.updateStatus
);

export default router;
