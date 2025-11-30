const jwt = require('jsonwebtoken');
const { promisify } = require('util'); // Utilitário do Node para converter funções de callback em Promises
const User = require('../models/Users');

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Verificar se o token existe e está no cabeçalho Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Você não está logado. Por favor, faça o login para obter acesso.' });
    }

    // 2. Verificar se o token é válido
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3. Verificar se o usuário dono do token ainda existe
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'O usuário dono deste token não existe mais.' });
    }

    // 4. Anexar o usuário à requisição para que outras rotas possam usá-lo
    req.user = currentUser;
    
    // Se tudo estiver ok, passa para a próxima função (o controller)
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado. Faça o login novamente.' });
  }
};

module.exports = protect;
