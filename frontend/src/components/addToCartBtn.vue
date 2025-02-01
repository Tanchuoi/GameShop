<script setup>
import { useCartStore } from '@/stores/cartStore';
import { useToastService } from '@/services/toast.service';

const props = defineProps({
  game: Object
});
const cartStore = useCartStore();
const toastService = useToastService();

async function addToCart(game) {
  try {
    const isEnoughStock = await cartStore.checkGameStock(props.game.id);
    if (!isEnoughStock) {
      toastService.error('Game out of stock');
      return;
    }
    await cartStore.addGameToCart(game);
    toastService.success('Game added to cart');
  } catch (error) {
    console.error('Error adding game to cart:', error);
    toastService.error('Error adding game to cart');
  }
}
</script>

<template>
  <button
    type="button"
    class="button"
    @click="addToCart(props.game)"
  >
    <span class="button__text">Add to cart</span>
    <span class="button__icon"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke="currentColor"
        height="24"
        fill="none"
        class="svg"
      >
        <line
          y2="19"
          y1="5"
          x2="12"
          x1="12"
        ></line>
        <line
          y2="12"
          y1="12"
          x2="19"
          x1="5"
        ></line>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #34974d;
  background-color: #3aa856;
  border-radius: 6px;
}

.button,
.button__icon,
.button__text {
  transition: all 0.3s;
}

.button .button__text {
  transform: translateX(16px);
  color: #fff;
  font-weight: 600;
}

.button .button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: #34974d;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.button .svg {
  width: 30px;
  stroke: #fff;
}

.button:hover {
  background: #34974d;
}

.button:hover .button__text {
  color: transparent;
}

.button:hover .button__icon {
  width: 148px;
  transform: translateX(0);
}

.button:active .button__icon {
  background-color: #2e8644;
}

.button:active {
  border: 1px solid #2e8644;
}
</style>
