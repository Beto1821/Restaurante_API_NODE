const Order = require('../models/Order');
const { toApiFormat, toDbFormat } = require('../utils/mapper');

// Criar um novo pedido
exports.createOrder = async (req, res) => {
  try {
    // Converte do formato da API para o formato do banco
    const orderData = toDbFormat(req.body);
    
    const order = new Order(orderData);
    await order.save();
    
    res.status(201).json({
      message: 'Pedido criado com sucesso',
      order: toApiFormat(order)
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erro ao criar pedido', 
      error: error.message 
    });
  }
};

// Obter pedido por número
exports.getOrderById = async (req, res) => {
  try {
    const { numeroPedido } = req.params;
    const order = await Order.findOne({ orderId: numeroPedido });
    
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    
    res.status(200).json(toApiFormat(order));
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao buscar pedido', 
      error: error.message 
    });
  }
};

// Listar todos os pedidos
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const formattedOrders = orders.map(order => toApiFormat(order));
    
    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao listar pedidos', 
      error: error.message 
    });
  }
};

// Atualizar pedido
exports.updateOrder = async (req, res) => {
  try {
    const { numeroPedido } = req.params;
    const orderData = toDbFormat(req.body);
    
    const order = await Order.findOneAndUpdate(
      { orderId: numeroPedido },
      orderData,
      { new: true, runValidators: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    
    res.status(200).json({
      message: 'Pedido atualizado com sucesso',
      order: toApiFormat(order)
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Erro ao atualizar pedido', 
      error: error.message 
    });
  }
};

// Deletar pedido
exports.deleteOrder = async (req, res) => {
  try {
    const { numeroPedido } = req.params;
    const order = await Order.findOneAndDelete({ orderId: numeroPedido });
    
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    
    res.status(200).json({ 
      message: 'Pedido deletado com sucesso',
      order: toApiFormat(order)
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erro ao deletar pedido', 
      error: error.message 
    });
  }
};