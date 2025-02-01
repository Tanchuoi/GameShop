import axios from 'axios';

function makeCartService() {
  // Cart
  async function addGameToCart(cart_id, game_id) {
    const response = await axios.post(`/api/v1/cart/${cart_id}/game/${game_id}`);
    return response.data;
  }

  async function updateGameInCart(cartData) {
    return await axios.put(`/api/v1/cart/${cartId}/game/${gameId}`, cartData);
  }

  async function removeGameFromCart(cartId, gameId) {
    return await axios.delete(`/api/v1/cart/${cartId}/game/${gameId}`);
  }

  async function getCartByUserId(userId) {
    const response = await axios.get(`/api/v1/user/${userId}/cart/`);
    return response.data;
  }

  async function getAnonymousCart() {
    const response = await axios.get(`/api/v1/cart/Anonymous/`);
    return response.data;
  }

  async function removeAllGamesFromCart(cartId) {
    return await axios.delete(`/api/v1/cart/${cartId}/games/`);
  }

  async function checkOut(cartId) {
    const response = await axios.post(`/api/v1/cart/${cartId}/checkout/`);
    return response.data;
  }

  return {
    addGameToCart,
    updateGameInCart,
    removeGameFromCart,
    getCartByUserId,
    getAnonymousCart,
    removeAllGamesFromCart,
    checkOut
  };
}

export default makeCartService();
