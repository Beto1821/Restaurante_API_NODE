require('dotenv').config();

const express = require('express');

const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/order', orderRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.status(200).send('API do Restaurante está no ar!');
});

module.exports = app;