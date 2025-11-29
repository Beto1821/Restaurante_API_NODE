// Carrega as variáveis de ambiente do arquivo .env
// Deve ser a primeira linha para garantir que as variáveis estejam disponíveis globalmente.
require('dotenv').config();

// Imports de pacotes de terceiros
const express = require('express');

// Imports de módulos locais
const connectDB = require('./config/database');
const orderRoutes = require('./routes/orderRoutes');

// Função principal assíncrona para controlar a ordem de inicialização
const startServer = async () => {
  try {
    // 1. Conectar ao banco de dados primeiro
    await connectDB();

    // 2. Apenas se a conexão for bem-sucedida, configurar e iniciar o servidor Express
    const app = express();
    const PORT = process.env.PORT || 3000;

    // Middlewares essenciais
    app.use(express.json()); // Para parsear o corpo de requisições JSON

    // Configuração das rotas da aplicação
    app.use('/order', orderRoutes);

    // Rota raiz para diagnóstico - para verificar se a API está online
    app.get('/', (req, res) => {
      res.status(200).send('API do Restaurante está no ar!');
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor.', error);
  }
};

// Executa a função para iniciar o servidor
startServer();
