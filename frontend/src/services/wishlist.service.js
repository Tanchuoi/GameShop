import axios from 'axios';

function makeWishlistService() {
  async function addGameToWishlist(userId, gameId) {
    return await axios.post(`/api/v1/wishlist/${userId}/game/${gameId}`);
  }

  async function removeGameFromWishlist(userId, gameId) {
    return await axios.delete(`/api/v1/wishlist/${userId}/game/${gameId}`);
  }

  return {
    addGameToWishlist,
    removeGameFromWishlist
  };
}

export default makeWishlistService();
