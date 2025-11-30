require('dotenv').config();

const connectDB = require('./config/database');
const app = require('./app');

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor.', error);
  }
};

startServer();
