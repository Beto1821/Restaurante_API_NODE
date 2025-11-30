// Função para converter do formato MongoDB para o formato da API
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

// Função para converter do formato da API para o formato MongoDB
const toDbFormat = (order) => {
  const calculatedTotal = order.itens.reduce((sum, item) => {
    return sum + (item.valorItem * item.quantidadeItem);}, 0);
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