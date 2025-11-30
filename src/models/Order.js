const mongoose = require('mongoose');

// Schema para os itens do pedido
const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});

// Schema principal do pedido
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: Number,
    required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  itens: [itemSchema]
});

module.exports = mongoose.model('Order', orderSchema);
