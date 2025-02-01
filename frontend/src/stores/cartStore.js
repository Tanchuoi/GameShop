// stores/cartStore.js
import { defineStore } from 'pinia';
import cartService from '@/services/cart.service';
import gameService from '@/services/game.service';
import { computed } from 'vue';
const isAuthenticated = computed(() => !!sessionStorage.getItem('isAuthenticated'));

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartId: null,
    cartList: []
  }),
  actions: {
    async addGameToCart(game) {
      await cartService.addGameToCart(this.cartId, game.id);
      await this.fetchGamesInCart(this.cartId);
    },

    async getUserCart(userId) {
      if (isAuthenticated.value) {
        await this.getCartByUserId(userId);
        const anonymousCart = await cartService.getAnonymousCart();
        if (anonymousCart) {
          const games = await gameService.getGamesInCart(anonymousCart.id);
          if (games.length > 0) {
            await this.mergeAnonymousCartIntoUserCart(games);
            await this.removeAllGamesFromCart(anonymousCart.id);
          }
        }
        await this.fetchGamesInCart(this.cartId);
      } else {
        await this.getAnonymousCart();
      }
    },
    async getCartByUserId(userId) {
      const response = await cartService.getCartByUserId(userId);
      this.cartId = response.id;
      this.fetchGamesInCart(this.cartId);
    },

    async getAnonymousCart() {
      const response = await cartService.getAnonymousCart();
      this.cartId = response.id;
      this.fetchGamesInCart(this.cartId);
    },

    async mergeAnonymousCartIntoUserCart(Games) {
      for (const game of Games) {
        for (let i = 0; i < game.quantity; i++) {
          await cartService.addGameToCart(this.cartId, game.id);
        }
        const games = await this.fetchGamesInCart(this.cartId);
        this.cartList.push(games);
      }
    },

    async fetchGamesInCart(cartId) {
      this.cartList = await gameService.getGamesInCart(cartId);
    },

    async removeGameFromCart(gameId) {
      await cartService.removeGameFromCart(this.cartId, gameId);
      this.cartList = this.cartList.filter((game) => game.id !== gameId);
    },

    async removeAllGamesFromCart(cartId) {
      await cartService.removeAllGamesFromCart(cartId);
      this.cartList = [];
    },

    async checkOut(cartId) {
      await cartService.checkOut(cartId);
      this.cartList = [];
    },

    async checkGameStock(gameId) {
      const games = await gameService.getGamesInCart(this.cartId);
      const game = games.find((game) => game.id === gameId);
      if (!game) return true;
      return game.stock > game.quantity;
    }
  }
});
