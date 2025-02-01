import { defineStore } from 'pinia';
import wishlistService from '@/services/wishlist.service';
import gameService from '@/services/game.service';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlist: []
  }),
  actions: {
    async getGamesInWishlist(userId) {
      if (userId === null) {
        return;
      }
      const games = await gameService.getGamesInWishlist(userId);
      this.wishlist = games.map((game) => game.id);
    },

    async addGameToWishlist(userId, gameId) {
      const game = await wishlistService.addGameToWishlist(userId, gameId);
      await this.getGamesInWishlist(userId);
      this.wishlist.push(game);
    },

    async removeGameFromWishlist(userId, gameId) {
      await wishlistService.removeGameFromWishlist(userId, gameId);
      await this.getGamesInWishlist(userId);
      this.wishlist = this.wishlist.filter((game) => game.id !== gameId);
    }
  }
});
