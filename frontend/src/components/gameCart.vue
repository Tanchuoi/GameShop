<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import { useToastService } from '@/services/toast.service';

const toastService = useToastService();
const userStore = useUserStore();
const cartStore = useCartStore();
const cartOpen = ref(false);
const userId = computed(() => sessionStorage.getItem('userId') ?? null);

const clearCart = () => {
  removeAllGamesFromCart(cartStore.cartId);
};

// Open and close the cart
const toggleCart = () => {
  cartOpen.value = !cartOpen.value;
};

// Close cart when clicking outside
const handleClickOutside = (e) => {
  if (!e.target.closest('.cart') && !e.target.closest('.cart-button')) {
    cartOpen.value = false;
  }
};

async function fetchGamesInCart(cartId) {
  try {
    await cartStore.fetchGamesInCart(cartId);
  } catch (error) {
    console.error('Error fetching games in cart:', error);
    toastService.error('Error fetching games in cart');
  }
}

async function removeGameFromCart(gameId) {
  try {
    await cartStore.removeGameFromCart(gameId);
    toastService.success('Game removed from cart');
  } catch (error) {
    console.error('Error removing game from cart:', error);
    toastService.error('Error removing game from cart');
  }
}

async function removeAllGamesFromCart(cartId) {
  try {
    await cartStore.removeAllGamesFromCart(cartId);
    toastService.success('All games removed from cart');
  } catch (error) {
    console.error('Error removing all games from cart:', error);
    toastService.error('Error removing all games from cart');
  }
}

async function checkOut(cartId) {
  try {
    if (userStore.isAuthenticated) {
      await cartStore.checkOut(cartId);
      toastService.success('Checkout successful');
    } else {
      toastService.error('Please login to checkout');
    }
  } catch (error) {
    console.error('Error checking out:', error);
    toastService.error('Error checking out');
  }
}

// Event listener to detect clicks outside the cart
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <!-- Button to open cart -->
  <button
    class="p-1 cart-button"
    @click="toggleCart"
  >
    Cart: {{ cartStore.cartList.length }}
  </button>

  <!-- Overlay with transition -->
  <transition
    name="fade"
    class="cursor-default"
  >
    <div
      v-if="cartOpen"
      class="fixed inset-0 z-40 bg-opacity-50 bg-main-black"
    ></div>
  </transition>

  <!-- Cart Sidebar with transition -->
  <transition
    name="slide"
    class="cursor-default"
  >
    <div
      v-show="cartOpen"
      class="fixed top-0 right-0 z-50 w-1/3 h-full p-6 text-white transform shadow-md cart bg-content-black"
    >
      <!-- Cart Header -->
      <div class="flex justify-between mb-4">
        <h1
          class="text-3xl font-extrabold"
          v-if="cartStore.cartList.length > 0"
        >
          {{ cartStore.cartList.length }} games
        </h1>
        <h1
          class="text-3xl font-extrabold"
          v-else
        >
          No game added
        </h1>
        <button
          @click="clearCart()"
          class="text-lg font-normal"
        >
          Clear
        </button>
      </div>

      <!-- Cart Items -->
      <div
        v-for="item in cartStore.cartList"
        :key="item.id"
        class="flex justify-between p-4 mb-4 rounded-lg bg-sub-black"
      >
        <span>{{ item.name }}</span>
        <span>{{ item.quantity }}</span>
        <div>
          <span class="mr-3">${{ item.price }}</span>
          <button
            class="hover:opacity-85"
            @click="removeGameFromCart(item.id)"
          >
            <i class="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Cart Footer -->
      <div class="flex justify-between mt-auto">
        <span
          >Total: ${{
            cartStore.cartList.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
          }}</span
        >
        <button
          class="text-lg"
          @click="checkOut(cartStore.cartId)"
        >
          Checkout ➔
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Transition for the cart sliding in and out */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

/* Fade transition for the overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
