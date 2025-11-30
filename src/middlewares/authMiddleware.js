const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/Users');

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Você não está logado. Por favor, faça o login para obter acesso.' });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({ message: 'O usuário dono deste token não existe mais.' });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado. Faça o login novamente.' });
  }
};

module.exports = protect;
