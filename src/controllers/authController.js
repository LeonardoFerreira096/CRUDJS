/**
 * Nome do arquivo: authController
 * Data de criação: 05/12/24
 * Autor: Leonardo Costa Ferreira
 * Matrícula: 01738044
 *
 * Descrição: Controller de autenticação (login/logout)
 *
 * Funcionalidades: Login unificado com verificação de role
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { SECRET } from '../middleware/authMiddleware.js';

class AuthController {
  
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }

      let usuario = await prisma.cliente.findUnique({
        where: { email }
      });

      let tipo = 'cliente';
      let role = 'cliente';

      if (!usuario) {
        usuario = await prisma.funcionario.findUnique({
          where: { email }
        });

        if (!usuario) {
          return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        tipo = 'funcionario';
        
        role = usuario.role || 'funcionario'; 
      }

      
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }

      
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email,
          role: role,  
          tipo: tipo
        },
        SECRET,
        { expiresIn: '8h' }
      );

      
      const { senha: _, ...usuarioSemSenha } = usuario;

      return res.status(200).json({
        usuario: {
          ...usuarioSemSenha,
          role,  
          tipo
        },
        token
      });

    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

 
  async verificarToken(req, res) {
    try {
      return res.status(200).json({
        valido: true,
        usuario: req.usuario
      });
    } catch (error) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }

  
  async logout(req, res) {
    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  }
}

export default new AuthController();