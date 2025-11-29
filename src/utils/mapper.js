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
  return {
    orderId: order.numeroPedido,
    value: order.valorTotal,
    creationDate: order.dataCriacao,
    itens: order.itens.map(item => ({
      productId: item.idItem,
      quantity: item.quantidade,
      price: item.precoUnitario
    }))
  };
};

module.exports = {
  toApiFormat,
  toDbFormat
};