<script setup>
import { computed, ref } from 'vue';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useUserStore } from '@/stores/userStore';
import { useGameStore } from '@/stores/gameStore';
import { useToastService } from '@/services/toast.service';
const props = defineProps({
  game: Object
});
const wishlistStore = useWishlistStore();
const userStore = useUserStore();
const toastService = useToastService();
const gameStore = useGameStore();
const isInWishlist = computed(() => wishlistStore.wishlist.includes(props.game.id));

async function toggleWishlist() {
  try {
    if (userStore.isAuthenticated) {
      if (isInWishlist.value) {
        await wishlistStore.removeGameFromWishlist(userStore.user.id, props.game.id);
        toastService.success('Game removed from wishlist');
        if (gameStore.selectedFilter === 'Wishlist') {
          await gameStore.fetchGamesInWishlist(userStore.user.id);
        }
      } else {
        await wishlistStore.addGameToWishlist(userStore.user.id, props.game.id);
        toastService.success('Game added to wishlist');
      }
    } else {
      toastService.error('Please login to add to wishlist');
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    toastService.error('Error toggling wishlist');
  }
}
</script>

<template>
  <div
    class="text-gray-400 cursor-pointer"
    :class="{ 'text-red-500': isInWishlist }"
    @click.prevent="toggleWishlist"
  >
    <i class="fas fa-heart"></i>
  </div>
</template>

<style scoped></style>
