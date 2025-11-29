const mongoose = require('mongoose');

// Sub-schema para os itens dentro do pedido
const itemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'O nome do cliente é obrigatório.'],
  },
  items: [itemSchema], // Array de itens, usando o sub-schema
  total: { type: Number, required: true },
  status: { type: String, default: 'Recebido' },
}, { timestamps: true }); // timestamps adiciona createdAt e updatedAt automaticamente

module.exports = mongoose.model('Order', orderSchema);
