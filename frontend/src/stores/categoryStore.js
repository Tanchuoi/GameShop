import { defineStore } from 'pinia';
import categoryService from '@/services/category.service';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    category: {}
  }),
  actions: {
    async fetchCategories() {
      this.categories = await categoryService.getCategories();
    },
    async fetchCategory(id) {
      this.category = await categoryService.getCategoryById(id);
    },
    async getGameCategories(gameId) {
      this.categories = await categoryService.getGameCategories(gameId);
    }
  }
});
