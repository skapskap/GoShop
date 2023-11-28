const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calcular o preço dos itens
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  // Calcular o valor do frete (Se o pedido for acima de R$ 300, gratuito. Senão, 25 reais de frete)
  state.shippingPrice = addDecimals(state.itemsPrice > 300 ? 0 : 25);

  // Calcular o valor dos impostos (15%)
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

  // Calcular o valor total
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
