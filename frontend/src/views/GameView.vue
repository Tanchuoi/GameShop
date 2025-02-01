<script setup>
// Importing components
import navbar from '@/components/navbar.vue';
import myFooter from '@/components/myFooter.vue';
import swiper from '@/components/swiper.vue';
import addToCartBtn from '@/components/addToCartBtn.vue';
import heartBtn from '@/components/heartBtn.vue';
import gameService from '@/services/game.service';
import { useToastService } from '@/services/toast.service';
import { useGameStore } from '@/stores/gameStore';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';
import { useCategoryStore } from '@/stores/categoryStore';
import { useUserStore } from '@/stores/userStore';

const gameStore = useGameStore();
const categorieStore = useCategoryStore();
const userStore = useUserStore();
const gameId = useRoute().params.id;
const toastService = useToastService();
// Reactive state for toggling the expansion of the "About" section
const isExpanded = ref(false);
const images = ref([]);

const formattedCategories = computed(() => {
  return categorieStore.categories.map((category) => category.name).join(', ');
});

// Toggle function
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

// Fetch the game data
async function fetchGame(gameId) {
  try {
    gameStore.fetchGame(gameId);
    categorieStore.getGameCategories(gameId);
  } catch (error) {
    console.error('Error fetching game:', error);
    toastService.success('Error fetching game');
  }
}

async function getGameImages(gameId) {
  try {
    const response = await gameService.getGameImages(gameId);
    images.value = response;
  } catch (error) {
    console.error('Error fetching game images:', error);
    toastService.success('Error fetching game images');
  }
}

const formattedReleaseDay = computed(() => {
  return gameStore.game?.release_day
    ? format(new Date(gameStore.game.release_day), 'dd/MM/yyyy')
    : 'N/A';
});

onMounted(() => {
  userStore.getUserSession();
  fetchGame(gameId);
  getGameImages(gameId);
});
</script>

<template>
  <navbar />
  <div class="h-auto p-5 pt-12 text-white bg-main-black lg:h-[90vh]">
    <!-- Back Button and Title Section -->
    <div class="flex flex-col mb-4 space-y-4 lg:flex-row lg:space-y-0 lg:place-content-between">
      <routerLink
        to="/"
        class="text-xl font-bold text-gray-300 lg:text-2xl"
      >
        <i class="fa-solid fa-arrow-left"></i> Store
      </routerLink>
      <h1
        class="text-4xl font-black text-center lg:text-6xl"
        v-if="gameStore.game"
      >
        {{ gameStore.game.name || 'Game Title' }}
      </h1>
    </div>

    <!-- Game Content Grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Game Slider -->
      <div class="relative">
        <!-- Fix image size with a fixed height -->
        <swiper
          class="fixed-image-height"
          :images="images"
        />
      </div>

      <!-- Game Info -->
      <div class="bg-main-black">
        <div class="mb-6 aboutCard">
          <div
            class="px-6 pt-5 overflow-auto aboutSection max-h-48 bg-content-black rounded-t-xl lg:px-12"
          >
            <h3 class="mb-2 text-xl font-extrabold lg:text-2xl">About</h3>
            <p
              class="text-sm text-gray-text lg:text-base"
              v-if="gameStore.game"
            >
              {{ gameStore.game.description || 'Game Description' }}
            </p>
          </div>
          <div
            :class="[
              'flex justify-end bg-hover-black moreSection',
              { 'rounded-b-none': isExpanded, 'rounded-b-xl': !isExpanded }
            ]"
          >
            <button
              @click="toggleExpand"
              class="p-4 mr-4 font-semibold transition rounded text-gray-text hover:opacity-85 lg:mr-8"
            >
              {{ isExpanded ? 'Hide' : 'More' }}
              <i
                :class="isExpanded ? 'fa-caret-up' : 'fa-caret-down'"
                class="p-1 fa-solid"
              ></i>
            </button>
          </div>

          <!-- Extra Info Section -->
          <div
            v-if="isExpanded"
            :class="[
              'px-6 pb-4 text-sm text-gray-text bg-hover-black',
              { 'rounded-b-xl': isExpanded }
            ]"
            class="lg:px-12 lg:text-base"
          >
            <p>Released: {{ formattedReleaseDay }}</p>
            <p>Platforms: {{ gameStore.game.platform }}</p>
            <p>Genres: {{ formattedCategories }}</p>
            <p>Developers: {{ gameStore.game.developer }}</p>
            <p>Publishers: {{ gameStore.game.publisher }}</p>
          </div>
        </div>
        <!-- Price and Add to Cart Section -->
        <div
          class="flex items-center justify-between p-4 bg-content-black rounded-xl lg:p-5 min-h-14"
        >
          <div>
            <span
              class="flex p-2 text-xl font-semibold text-gray-text lg:text-2xl"
              v-if="gameStore.game"
              >${{ gameStore.game.price }}

              <heartBtn
                class="ml-4"
                :game="gameStore.game"
              />
            </span>
          </div>
          <addToCartBtn
            :game="gameStore.game"
            @click.prevent
          />
        </div>
      </div>
    </div>
  </div>
  <myFooter />
</template>

<style scoped>
.aboutSection::-webkit-scrollbar {
  display: none;
}

/* Ensure the image container has a fixed height */
.fixed-image-height {
  height: 20rem; /* Smaller height for small screens */
}

@media (min-width: 1024px) {
  .fixed-image-height {
    height: 30rem; /* Larger height for larger screens */
  }
}

.fixed-image-height img {
  object-fit: cover; /* Prevent the image from stretching */
  height: 100%; /* Ensure it uses the full height of the container */
  width: 100%; /* Ensure it uses the full width of the container */
}

.aboutCard {
  transition: max-height 0.3s ease;
}

.aboutCard p {
  transition: max-height 0.3s ease;
}
</style>
