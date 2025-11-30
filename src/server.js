// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Imports de módulos locais
const connectDB = require('./config/database');
const app = require('./app');

// Função principal assíncrona para controlar a ordem de inicialização
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor.', error);
  }
};

// Executa a função para iniciar o servidor
startServer();
