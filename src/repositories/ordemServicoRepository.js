import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class OrdemServicoRepository {
  async create(data) {
    return await prisma.ordemServico.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        dataInicio: new Date(data.dataInicio),
        dataPrevistaTermino: data.dataPrevistaTermino ? new Date(data.dataPrevistaTermino) : null,
        status: data.status || 'pendente',
        clienteId: data.clienteId
      },
      include: {
        clientes: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true
          }
        }
      }
    });
  }

  async findAll(filters = {}) {
    const where = {};

    if (filters.status) where.status = filters.status;
    if (filters.clienteId) where.clienteId = parseInt(filters.clienteId);
    if (filters.dataInicio) where.dataInicio = { gte: new Date(filters.dataInicio) };

    return await prisma.ordemServico.findMany({
      where,
      include: {
        clientes: { select: { id: true, nome: true, email: true, telefone: true }},
        alocacoes: {
          include: {
            funcionarios: {
              select: { id: true, nome: true, especialidade: true }
            }
          }
        }
      },
      orderBy: { dataInicio: 'desc' }
    });
  }

  async findById(id) {
    return await prisma.ordemServico.findUnique({
      where: { id: parseInt(id) },
      include: {
        clientes: {
          select: { id: true, nome: true, email: true, telefone: true, endereco: true }
        },
        alocacoes: {
          include: {
            funcionarios: {
              select: { id: true, nome: true, cargo: true, especialidade: true }
            }
          }
        }
      }
    });
  }

  async update(id, data) {
    const updateData = {};

    if ('nome' in data) updateData.nome = data.nome;
    if ('descricao' in data) updateData.descricao = data.descricao;
    if ('dataInicio' in data) updateData.dataInicio = new Date(data.dataInicio);
    if ('dataPrevistaTermino' in data)
      updateData.dataPrevistaTermino = data.dataPrevistaTermino ? new Date(data.dataPrevistaTermino) : null;
    if ('status' in data) updateData.status = data.status;
    if ('clienteId' in data) updateData.clienteId = data.clienteId;

    return await prisma.ordemServico.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        clientes: { select: { id: true, nome: true, email: true, telefone: true }}
      }
    });
  }

  async delete(id) {
    return await prisma.ordemServico.delete({ where: { id: parseInt(id) } });
  }

  async updateStatus(id, status) {
    return await prisma.ordemServico.update({
      where: { id: parseInt(id) },
      data: { status },
      include: { clientes: true }
    });
  }

  async getAllClientes() {
    return await prisma.cliente.findMany({
      select: { id: true, nome: true, email: true },
      orderBy: { nome: 'asc' }
    });
  }

  async getStats() {
    const [total, pendentes, emAndamento, concluidas, canceladas] = await Promise.all([
      prisma.ordemServico.count(),
      prisma.ordemServico.count({ where: { status: 'pendente' } }),
      prisma.ordemServico.count({ where: { status: 'em_andamento' } }),
      prisma.ordemServico.count({ where: { status: 'concluida' } }),
      prisma.ordemServico.count({ where: { status: 'cancelada' } })
    ]);

    return { total, pendentes, emAndamento, concluidas, canceladas };
  }

  async findByFuncionario(funcionarioId) {
    return await prisma.ordemServico.findMany({
      where: {
        alocacoes: {
          some: { funcionarioId: parseInt(funcionarioId) }
        }
      },
      include: {
        clientes: { select: { id: true, nome: true, email: true, telefone: true }},
        alocacoes: {
          where: { funcionarioId: parseInt(funcionarioId) },
          include: {
            funcionarios: {
              select: { id: true, nome: true, especialidade: true }
            }
          }
        }
      },
      orderBy: { dataInicio: 'desc' }
    });
  }
}

export default new OrdemServicoRepository();
