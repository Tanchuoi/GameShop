import { defineStore } from 'pinia';
import userService from '@/services/user.service';
import { computed } from 'vue';
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false
    };
  },
  actions: {
    async login(UserData) {
      const response = await userService.login(UserData);
      if (response.ok) {
        this.user = response;
        this.isAuthenticated = true;
        if (this.user.user.role === 'Admin') {
          this.isAdmin = true;
        }
        sessionStorage.setItem('username', this.user.user.username);
        sessionStorage.setItem('userId', this.user.user.id);
        sessionStorage.setItem('isAuthenticated', this.isAuthenticated);
        sessionStorage.setItem('isAdmin', this.isAdmin);
      }
    },

    async register(userData) {
      const response = await userService.register(userData);
      if (response) {
        window.location.reload();
      }
    },

    async logout() {
      const response = await userService.logout();
      if (response) {
        this.user = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
        sessionStorage.clear();
        window.location.reload();
      }
    },

    async getUserSession() {
      const userId = computed(() => sessionStorage.getItem('userId') ?? null);
      if (userId.value === null) {
        return;
      }
      const response = await userService.getUserById(userId.value);
      if (response) {
        this.user = response;
        this.isAuthenticated = true;
        if (this.user.role === 'Admin') {
          this.isAdmin = true;
        }
      }
    }
  }
});
