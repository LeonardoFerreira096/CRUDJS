import { registerUserService, loginUserService } from '../services/clientService.js';

export async function registerController(req, res) {
  try {
    const novoCliente = await registerUserService(req.body);
    res.status(201).json({ mensagem: `Cliente ${novoCliente.nome} cadastrado com sucesso!` });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ mensagem: error.message || 'Erro ao cadastrar cliente. Por favor, tente novamente.' });
  }
}

export async function loginController(req, res) {
  try {
    const cliente = await loginUserService(req.body);
    res.status(200).json({ mensagem: `Login realizado com sucesso! Bem-vindo, ${cliente.nome}!` });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(401).json({ mensagem: error.message || 'Erro ao fazer login. Por favor, tente novamente.' });
  }
}
