import axios from 'axios';

function makeCategoryService() {
  // Categories
  async function addCategory(categoryData) {
    return await axios.post(`/api/v1/category/`, categoryData);
  }

  async function deleteCategory(categoryId) {
    return await axios.delete(`/api/v1/category/${categoryId}`);
  }

  async function getCategories() {
    const response = await axios.get(`/api/v1/categories/`);
    return response.data;
  }

  async function getCategoryById(categoryId) {
    const response = await axios.get(`/api/v1/category/${categoryId}`);
    return response.data;
  }

  async function getGameCategories(gameId) {
    const response = await axios.get(`/api/v1/game/${gameId}/categories/`);
    return response.data;
  }

  return {
    addCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    getGameCategories
  };
}

export default makeCategoryService();
