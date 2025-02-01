<script setup>
import addToCartBtn from '@/components/addToCartBtn.vue';
import heartBtn from './heartBtn.vue';
import { useToastService } from '@/services/toast.service';
import { useGameStore } from '@/stores/gameStore';
import { ref, computed, defineProps, onMounted } from 'vue';
import gameService from '@/services/game.service';

const images = ref([]);
const props = defineProps({
  game: Object
});
const gameStore = useGameStore();
const toastService = useToastService();

async function getGameImages(gameId) {
  try {
    const response = await gameService.getGameImages(gameId);
    images.value = response;
  } catch (error) {
    console.error('Error fetching game images:', error);
    toastService.error('Error fetching game images');
  }
}

onMounted(() => {
  getGameImages(props.game.id);
  gameStore.fetchGame(props.game.id);
});
</script>

<template>
  <router-link :to="`/game/${game.id}`">
    <div
      class="relative max-w-sm duration-300 ease-out rounded-lg shadow-lg cursor-pointer bg-sub-black hover:scale-105 hover:bg-hover-black"
    >
      <!-- Game image -->
      <img
        :src="`/${images[0]?.image}`"
        alt="game"
        class="object-cover w-full h-48 rounded-t-lg"
      />

      <!-- Game details -->
      <div class="p-4 text-white">
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">{{ game.name }}</span>
          <span class="text-lg font-bold">${{ game.price }}</span>
        </div>
        <div class="flex justify-between">
          <addToCartBtn
            @click.prevent.stop
            class="mt-3 round"
            :game="game"
          />
          <heartBtn
            class="mt-4 text-2xl"
            :game="game"
          />
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped></style>
