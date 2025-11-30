const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

// Registra um novo usuário
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Senha criptografada automaticamente pelo hook 'pre-save' do modelo
    const user = new User({
      email,
      password
    });

    await user.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
};

// Autentica usuário e retorna token JWT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      status: 'success',
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};