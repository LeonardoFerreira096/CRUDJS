import ordemServicoService from '../services/ordemServicoService.js';


class OrdemServicoController {
  
  async createByCliente(req, res) {
    try {
      const clienteId = req.usuario.id;
      
      const ordemServico = await ordemServicoService.create({
        ...req.body,
        clienteId: clienteId, 
        status: 'pendente'
      });
      
      return res.status(201).json(ordemServico);
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  
  async create(req, res) {
    try {
      const ordemServico = await ordemServicoService.create(req.body);
      return res.status(201).json(ordemServico);
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  
  async getByCliente(req, res) {
    try {
      const clienteId = req.usuario.id;
      
      const ordensServico = await ordemServicoService.getAll({ 
        clienteId: clienteId 
      });
      
      return res.status(200).json(ordensServico);
    } catch (error) {
      console.error('Erro ao buscar ordens de serviço:', error);
      return res.status(500).json({ error: 'Erro ao buscar ordens de serviço' });
    }
  }

  
  async getAll(req, res) {
    try {
      const { status, clienteId, dataInicio } = req.query;
      const ordensServico = await ordemServicoService.getAll({ status, clienteId, dataInicio });
      return res.status(200).json(ordensServico);
    } catch (error) {
      console.error('Erro ao buscar ordens de serviço:', error);
      return res.status(500).json({ error: 'Erro ao buscar ordens de serviço' });
    }
  }

  
  async getByFuncionario(req, res) {
    try {
      const funcionarioId = req.usuario.id;
      
      const ordensServico = await ordemServicoService.getByFuncionario(funcionarioId);
      
      return res.status(200).json(ordensServico);
    } catch (error) {
      console.error('Erro ao buscar ordens do funcionário:', error);
      return res.status(500).json({ error: 'Erro ao buscar ordens' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const ordemServico = await ordemServicoService.getById(id);
      return res.status(200).json(ordemServico);
    } catch (error) {
      console.error('Erro ao buscar ordem de serviço:', error);
      return res.status(404).json({ error: error.message });
    }
  }

  
  async updateStatusByFuncionario(req, res) {
    try {
      const { id } = req.params;
      const { status, observacoes } = req.body;
      
      
      const ordemServico = await ordemServicoService.updateStatus(id, status);
      
      return res.status(200).json(ordemServico);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return res.status(400).json({ error: error.message });
    }
  }

 
  async update(req, res) {
    try {
      const { id } = req.params;
      const ordemServico = await ordemServicoService.update(id, req.body);
      return res.status(200).json(ordemServico);
    } catch (error) {
      console.error('Erro ao atualizar ordem de serviço:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ordemServicoService.delete(id);
      return res.status(200).json({ message: 'Ordem de serviço deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar ordem de serviço:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const ordemServico = await ordemServicoService.updateStatus(id, status);
      return res.status(200).json(ordemServico);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getAllClientes(req, res) {
    try {
      const clientes = await ordemServicoService.getAllClientes();
      return res.status(200).json(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
  }

  async getStats(req, res) {
    try {
      const stats = await ordemServicoService.getStats();
      return res.status(200).json(stats);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      return res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }
}

export default new OrdemServicoController();