import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

class FuncionarioController {
  async create(req, res) {
    const { nome, email, cargo, especialidade, senha } = req.body;

    try {
      if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios!' });
      }

      const funcionarioExistente = await prisma.funcionario.findUnique({ where: { email } });
      if (funcionarioExistente) return res.status(400).json({ mensagem: 'Email já cadastrado como funcionário' });

      const clienteExistente = await prisma.cliente.findUnique({ where: { email } });
      if (clienteExistente) return res.status(400).json({ mensagem: 'Email já cadastrado como cliente' });

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoFuncionario = await prisma.funcionario.create({
        data: {
          nome,
          email,
          senha: senhaHash,
          cargo: cargo || 'Funcionário',
          especialidade: especialidade || null,
          dataContratacao: new Date(),
          salario: 0,
          role: 'funcionario',
          ativo: true
        }
      });

      const { senha: _, ...funcionarioSemSenha } = novoFuncionario;

      return res.status(201).json({
        mensagem: 'Funcionário cadastrado com sucesso!',
        funcionario: funcionarioSemSenha
      });

    } catch (erro) {
      console.error('Erro ao criar funcionário:', erro);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar funcionário' });
    }
  }

  async getAll(req, res) {
    try {
      const funcionarios = await prisma.funcionario.findMany({
        select: { id: true, nome: true, email: true, cargo: true, especialidade: true, dataContratacao: true, ativo: true }
      });
      return res.status(200).json(funcionarios);
    } catch (erro) {
      console.error('Erro ao listar funcionários:', erro);
      return res.status(500).json({ mensagem: 'Erro ao listar funcionários' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const funcionario = await prisma.funcionario.findUnique({
        where: { id: parseInt(id) },
        select: { id: true, nome: true, email: true, cargo: true, especialidade: true, dataContratacao: true, ativo: true }
      });
      if (!funcionario) return res.status(404).json({ mensagem: 'Funcionário não encontrado' });
      return res.status(200).json(funcionario);
    } catch (erro) {
      console.error('Erro ao buscar funcionário:', erro);
      return res.status(500).json({ mensagem: 'Erro ao buscar funcionário' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, cargo, especialidade, ativo } = req.body;
      const funcionarioAtualizado = await prisma.funcionario.update({
        where: { id: parseInt(id) },
        data: { nome, email, cargo, especialidade, ativo }
      });
      return res.status(200).json(funcionarioAtualizado);
    } catch (erro) {
      console.error('Erro ao atualizar funcionário:', erro);
      return res.status(500).json({ mensagem: 'Erro ao atualizar funcionário' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await prisma.funcionario.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ mensagem: 'Funcionário deletado com sucesso' });
    } catch (erro) {
      console.error('Erro ao deletar funcionário:', erro);
      return res.status(500).json({ mensagem: 'Erro ao deletar funcionário' });
    }
  }
}

export default new FuncionarioController();
