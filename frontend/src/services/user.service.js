import axios from 'axios';

function makeUserService() {
  async function login(userData) {
    const response = await axios.post(`/api/v1/login/`, userData);
    return response.data;
  }

  async function logout() {
    return await axios.post(`/api/v1/logout/`);
  }

  async function register(userData) {
    const response = await axios.post(`/api/v1/register/`, userData);
    return response.data;
  }

  async function getUsers() {
    const response = await axios.get(`/api/v1/users/`);
    return response.data;
  }

  async function getUserById(userId) {
    const response = await axios.get(`/api/v1/user/${userId}`);
    return response.data;
  }

  async function deleteUser(userId) {
    return await axios.delete(`/api/v1/user/${userId}`);
  }

  return {
    login,
    register,
    getUsers,
    getUserById,
    deleteUser,
    logout
  };
}

export default makeUserService();
