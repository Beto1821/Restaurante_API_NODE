// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Imports de pacotes de terceiros
const express = require('express');

// Imports de módulos locais
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares essenciais
app.use(express.json()); // Para parsear o corpo de requisições JSON

// Configuração das rotas da aplicação
app.use('/order', orderRoutes);
app.use('/auth', authRoutes);

// Rota raiz para diagnóstico - para verificar se a API está online
app.get('/', (req, res) => {
  res.status(200).send('API do Restaurante está no ar!');
});

module.exports = app;