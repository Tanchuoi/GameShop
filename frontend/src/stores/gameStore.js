import { defineStore } from 'pinia';
import gameService from '@/services/game.service';

export const useGameStore = defineStore('games', {
  state: () => ({
    games: [],
    game: null,
    selectedFilter: 'None'
  }),
  actions: {
    async fetchGames() {
      this.games = await gameService.getGames();
    },
    async fetchGame(id) {
      this.game = await gameService.getGameById(id);
    },
    async createGame(game) {
      await gameService.createGame(game);
    },
    async deleteGame(id) {
      await gameService.deleteGame(id);
    },
    async updateGame(game) {
      await gameService.updateGame(game);
    },
    async setFilter(filter) {
      this.selectedFilter = filter;
    },
    async resetFilter() {
      this.selectedFilter = 'None';
    },
    async searchGame(search) {
      this.games = await gameService.getGameBySearch(search);
    },
    async fetchGamesByCategory(id) {
      this.games = await gameService.getGameByCategory(id);
    },
    async fetchGamesInWishlist(userId) {
      this.games = await gameService.getGamesInWishlist(userId);
    }
  }
});
