<script setup>
// Importing libraries
import { ref, onMounted, computed, watch } from 'vue';
import Paginator from 'primevue/paginator';

// Importing components
import gameCard from '@/components/gameCard.vue';
import Navbar from '@/components/navbar.vue';
import myFooter from '@/components/myFooter.vue';
import gameCart from '@/components/gameCart.vue';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useGameStore } from '@/stores/gameStore';
import { useCategoryStore } from '@/stores/categoryStore';
import { useToastService } from '@/services/toast.service';
import { useUserStore } from '@/stores/userStore';

// Importing composables
const categoryStore = useCategoryStore();
const gameStore = useGameStore();
const cartStore = useCartStore();
const toastService = useToastService();
const wishlistStore = useWishlistStore();
const userStore = useUserStore();
const userId = computed(() => sessionStorage.getItem('userId') ?? null);
const isAuthenticated = computed(() => sessionStorage.getItem('isAuthenticated') ?? false);

// Pagination state
const first = ref(0);
const rowsPerPage = ref(12); // Number of games per page

// Paginated games
const paginatedGames = computed(() => {
  const start = first.value;
  const end = start + rowsPerPage.value;
  return gameStore.games.slice(start, end);
});

// Handle pagination changes
function onPageChange(event) {
  first.value = event.first;
}

// Fetch functions
async function fetchGames() {
  try {
    await gameStore.fetchGames();
  } catch (error) {
    console.error('Error fetching games:', error);
    toastService.error('Error fetching games');
  }
}

async function fetchCategories() {
  try {
    await categoryStore.fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
    toastService.error('Error fetching categories');
  }
}

async function fetchGamesByCategory(categoryId) {
  try {
    await gameStore.fetchGamesByCategory(categoryId);
    await categoryStore.fetchCategory(categoryId);
    await gameStore.setFilter(categoryStore.category);
  } catch (error) {
    console.error('Error fetching games by category:', error);
    toastService.error('Error fetching games by category');
  }
}

async function fetchGamesInWishlist(userId) {
  try {
    await gameStore.fetchGamesInWishlist(userId);
    await gameStore.setFilter('Wishlist');
  } catch (error) {
    if (!isAuthenticated.value) {
      toastService.error('Please login to view your wishlist');
    } else {
      console.error('Error fetching game in wishlist:', error);
      toastService.error('Error fetching game in wishlist');
    }
  }
}

async function getUserCart(userId) {
  try {
    await cartStore.getUserCart(userId);
  } catch (error) {
    console.error('Error fetching user cart:', error);
    toastService.error('Error fetching user cart');
  }
}

// Clear filters and handle search
function clearFilter() {
  fetchGames();
  gameStore.resetFilter();
}

async function handleSearch(query) {
  if (query.trim().length > 0) {
    clearFilter();
    try {
      gameStore.searchGame(query);
    } catch (error) {
      console.error('Error searching for games:', error);
      toastService.error('Error searching for games');
    }
  } else {
    fetchGames(); // If the search query is empty, fetch the full game list again
  }
}

onMounted(() => {
  fetchGames();
  fetchCategories();
  getUserCart(userId.value);
  if (userId != null) {
    userStore.getUserSession();
    wishlistStore.getGamesInWishlist(userId.value);
  }
});
</script>

<template>
  <Navbar @update-search="handleSearch" />
  <!-- Main Content -->
  <div class="flex min-h-screen text-white bg-main-black">
    <!-- Sidebar (Fixed) -->
    <aside class="w-64 p-8 bg-main-black">
      <h2 class="mb-6 text-4xl font-bold">Filters</h2>
      <h3
        class="mb-3 text-lg font-semibold cursor-pointer"
        @click="fetchGamesInWishlist(userId)"
      >
        <i class="fa-solid fa-gift"></i> <span class="font-bold">Wishlist</span>
      </h3>
      <h3 class="inline-block mb-6 text-lg font-semibold cursor-pointer">
        <i class="fas fa-shopping-bag"></i>
        <gameCart />
      </h3>
      <!-- Genre Section -->
      <div class="mb-8">
        <h3 class="mb-4 text-3xl font-semibold">Genres</h3>
        <ul class="space-y-4">
          <li
            class="px-4 py-2 font-bold rounded-lg cursor-pointer bg-sub-black hover:bg-hover-black"
            v-for="category in categoryStore.categories"
            :key="category.id"
            @click="fetchGamesByCategory(category.id)"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 p-6">
      <!-- Title Section -->
      <h1 class="mb-6 text-4xl font-bold">Trending and Interesting</h1>
      <p class="mb-6 text-lg text-gray-400">Based on player counts and ratings</p>

      <!-- Filter Buttons -->
      <div class="flex items-center mb-6 space-x-4">
        <button class="px-4 py-2 rounded-lg bg-sub-black hover:bg-hover-black">
          Filter by:
          <p class="inline-block font-bold">{{ gameStore.selectedFilter }}</p>
        </button>
        <button
          class="px-4 py-2 font-bold rounded-lg bg-sub-black hover:bg-hover-black"
          @click="clearFilter"
        >
          Clear Filter
        </button>
      </div>

      <!-- Game Cards Section -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <gameCard
          v-for="game in paginatedGames"
          :key="game.id"
          :game="game"
        />
      </div>

      <!-- Paginator -->
      <paginator
        class="custom-paginator"
        :rows="rowsPerPage"
        :total-records="gameStore.games.length"
        :first="first"
        @page="onPageChange"
      />
    </div>
  </div>
  <myFooter />
</template>

<style scoped>
::v-deep(.p-paginator) {
  margin-top: 1rem;
  background-color: #0f1011;
}
</style>
