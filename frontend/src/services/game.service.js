import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api/v1';

function makeGameService() {
  // Games
  async function getGames() {
    const response = await axios.get(`/api/v1/games/`);
    return response.data;
  }

  async function createGame(gameData) {
    return await axios.post(`/api/v1/game/`, gameData);
  }

  async function getGameByCategory(categoryId) {
    const response = await axios.get(`/api/v1/games/category/${categoryId}`);
    return response.data;
  }

  async function getGameById(gameId) {
    const response = await axios.get(`/api/v1/game/${gameId}`);
    return response.data;
  }

  async function deleteGame(gameId) {
    return await axios.delete(`/api/v1/game/${gameId}`);
  }

  async function updateGame(gameId, gameData) {
    return await axios.put(`/api/v1/game/${gameId}`, gameData);
  }

  // Search
  async function getGameBySearch(searchTerm) {
    const response = await axios.get(`/api/v1/games/search/${searchTerm}`);
    return response.data;
  }

  async function getGamesInCart(cartId) {
    const response = await axios.get(`/api/v1/cart/${cartId}/games/`);
    return response.data;
  }

  async function getGamesInWishlist(userId) {
    const response = await axios.get(`/api/v1/wishlist/${userId}/games/`);
    return response.data;
  }

  async function getGameCategoriesTable() {
    const response = await axios.get(`/api/v1/gameCategories/`);
    return response.data;
  }

  async function getGameImages(gameId) {
    const response = await axios.get(`/api/v1/game/${gameId}/images`);
    return response.data;
  }

  return {
    getGames,
    createGame,
    getGameByCategory,
    getGameById,
    deleteGame,
    updateGame,
    getGameBySearch,
    getGamesInCart,
    getGamesInWishlist,
    getGameCategoriesTable,
    getGameImages
  };
}

export default makeGameService();
