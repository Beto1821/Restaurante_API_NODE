const Order = require('../models/Order');

// Função para criar um novo pedido
exports.createOrder = async (req, res) => {
  try {
    // Pega os dados do corpo da requisição (enviados pelo Postman)
    const { customerName, items, total } = req.body;

    // Cria uma nova instância do pedido com os dados recebidos
    const newOrder = new Order({
      customerName,
      items,
      total,
    });

    // Salva o pedido no banco de dados
    const savedOrder = await newOrder.save();

    // Responde com sucesso (status 201 - Created) e os dados do pedido salvo
    res.status(201).json({ message: 'Pedido criado com sucesso!', order: savedOrder });
  } catch (error) {
    // Em caso de erro (ex: campos faltando), responde com um erro 400
    res.status(400).json({ message: 'Erro ao criar pedido.', error: error.message });
  }
};
