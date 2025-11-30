const express = require('express');
const { register, login } = require('../controllers/authController.js');

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', register);

// Rota para fazer login e obter um token
router.post('/login', login);

module.exports = router;
