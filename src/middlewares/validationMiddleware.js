// Middleware para validar os dados de criação de um pedido
const validateOrderCreation = (req, res, next) => {
  const { numeroPedido, itens } = req.body;

  // 1. Valida se 'numeroPedido' existe e não é uma string vazia
  if (!numeroPedido || typeof numeroPedido !== 'string' || numeroPedido.trim() === '') {
    // Se a validação falhar, envia uma resposta de erro e para o processo
    return res.status(400).json({ message: 'O campo "numeroPedido" é obrigatório e não pode ser vazio.' });
  }

  // 2. Valida se 'itens' existe, é um array e não está vazio
  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ message: 'O campo "itens" é obrigatório e deve ser uma lista com pelo menos um item.' });
  }

  // Se todas as validações passarem, chama next() para continuar para o controller
  next();
};

// Middleware para validar os dados de atualização de um pedido
const validateOrderUpdate = (req, res, next) => {
  const { itens } = req.body;

  // Valida se 'itens' existe, é um array e não está vazio
  if (!itens || !Array.isArray(itens) || itens.length === 0) {
    return res.status(400).json({ message: 'O corpo da requisição para atualização deve conter um array de "itens" não vazio.' });
  }

  // Se a validação passar, continua para o controller
  next();
};


// Exporta a função para que possa ser usada nas rotas
module.exports = {
  validateOrderCreation,
  validateOrderUpdate
};
