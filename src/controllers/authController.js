const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Importa o User Model que você criou

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    // Pega email e senha do corpo da requisição
    const { email, password } = req.body;

    // Validação básica de entrada
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Verifica se o usuário já existe no banco
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      // Se o usuário já existe, retorna um erro claro
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }

    // Cria uma nova instância de usuário
    // A senha será criptografada automaticamente pelo hook 'pre-save' no seu User Model
    const user = new User({
      email,
      password
    });

    // Salva o novo usuário no banco de dados
    await user.save();

    // Envia uma resposta de sucesso
    // (Mais tarde, vamos gerar e enviar um token JWT aqui, em vez de apenas uma mensagem)
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });

  } catch (error) {
    // Em caso de qualquer outro erro (ex: erro de validação do Mongoose), envia uma resposta
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
};

// Função para fazer login de um usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Valida se email e senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor, forneça email e senha.' });
    }

    // Encontra o usuário no banco e inclui a senha na busca
    const user = await User.findOne({ email }).select('+password');

    // Usamos bcrypt.compare para comparar a senha da requisição com a senha criptografada do banco
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email ou senha inválidos.' });
    }

    // cria o token JWT
    const token = jwt.sign(
      { id: user._id }, // Payload: informações que queremos guardar no token
      process.env.JWT_SECRET, // Chave secreta para assinar o token
      { expiresIn: process.env.JWT_EXPIRES_IN } // Tempo de expiração do token
    );

    // Envia o token para o cliente
    res.status(200).json({
      status: 'success',
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};