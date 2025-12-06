import jwt from 'jsonwebtoken';

export const SECRET = process.env.JWT_SECRET || 'segredo :)';


export function verificaToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    
    req.usuario = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      tipo: decoded.tipo 
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}


export function verificaRole(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { role } = req.usuario;

    if (!rolesPermitidos.includes(role)) {
      return res.status(403).json({ 
        error: 'Acesso negado',
        message: `Você precisa ser ${rolesPermitidos.join(' ou ')} para acessar este recurso`
      });
    }

    next();
  };
}