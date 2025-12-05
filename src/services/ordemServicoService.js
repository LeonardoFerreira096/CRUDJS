import ordemServicoRepository from '../repositories/ordemServicoRepository.js';

class OrdemServicoService {
  async create(data) {
    if (!data.nome || !data.clienteId || !data.dataInicio) {
      throw new Error('Campos obrigatórios faltando');
    }
    return await ordemServicoRepository.create(data);
  }

  async getAll(filters = {}) {
    return await ordemServicoRepository.findAll(filters);
  }

  async getById(id) {
    const ordemServico = await ordemServicoRepository.findById(id);
    if (!ordemServico) {
      throw new Error('Ordem de serviço não encontrada');
    }
    return ordemServico;
  }

  async update(id, data) {
    await this.getById(id);
    return await ordemServicoRepository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return await ordemServicoRepository.delete(id);
  }

  async updateStatus(id, status) {
    const validStatuses = ['pendente', 'em_andamento', 'concluida', 'cancelada'];

    if (!validStatuses.includes(status)) {
      throw new Error('Status inválido');
    }

    return await ordemServicoRepository.updateStatus(id, status);
  }

  async getAllClientes() {
    return await ordemServicoRepository.getAllClientes();
  }

  async getStats() {
    return await ordemServicoRepository.getStats();
  }

  async getByFuncionario(funcionarioId) {
    return await ordemServicoRepository.findByFuncionario(funcionarioId);
  }
}

export default new OrdemServicoService();
