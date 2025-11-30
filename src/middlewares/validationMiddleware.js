// Valida dados de criação de pedido
const validateOrderCreation = (req, res, next) => {
  const { numeroPedido, itens } = req.body;

  if (!numeroPedido || typeof numeroPedido !== 'string' || numeroPedido.trim() === '') {
    return res.status(400).json({ message: 'O campo "numeroPedido" é obrigatório e não pode ser vazio.' });
  }

  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ message: 'O campo "itens" é obrigatório e deve ser uma lista com pelo menos um item.' });
  }

  next();
};

// Valida dados de atualização de pedido
const validateOrderUpdate = (req, res, next) => {
  const { itens } = req.body;

  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ message: 'O corpo da requisição para atualização deve conter um array de "itens" não vazio.' });
  }

  next();
};


module.exports = {
  validateOrderCreation,
  validateOrderUpdate
};
