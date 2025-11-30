// Converte do formato MongoDB para formato API
const toApiFormat = (order) => {
  return {
    numeroPedido: order.orderId,
    valorTotal: order.value,
    dataCriacao: order.creationDate,
    items: order.itens.map(item => ({
      idItem: item.productId,
      quantidadeItem: item.quantity,
      valorItem: item.price
    }))
  };
};

// Converte do formato API para formato MongoDB
const toDbFormat = (order) => {
  const calculatedTotal = order.itens.reduce((sum, item) => {
    return sum + (item.valorItem * item.quantidadeItem);
  }, 0);
  return {
    orderId: order.numeroPedido,
    value: calculatedTotal,
    creationDate: order.dataCriacao,
    itens: order.itens.map(item => ({
      productId: item.idItem,
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
};

module.exports = {
  toApiFormat,
  toDbFormat
};