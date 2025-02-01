<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const $emit = defineEmits(['update-search']);
const searchQuery = ref('');
const userStore = useUserStore();

function logout() {
  try {
    userStore.logout();
    sessionStorage.clear();
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

function updateSearch() {
  $emit('update-search', searchQuery.value);
}
</script>

<template>
  <nav class="flex items-center justify-between px-4 py-2 text-white bg-main-black">
    <!-- Left side: Game Store logo -->
    <routerLink
      to="/"
      class="items-center flex-auto cursor-pointer"
    >
      <i class="p-2 fa-solid fa-gamepad"></i>
      <span class="text-xl font-bold">Game Store</span>
    </routerLink>

    <!-- Center: Search bar -->
    <div class="relative flex-auto w-1/3">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search games..."
        class="w-full px-4 py-2 text-white rounded-full bg-sub-black focus:outline-none"
        @input="updateSearch"
      />
      <span class="absolute text-gray-400 right-3 top-2">
        <i class="fas fa-search"></i>
      </span>
    </div>

    <!-- Right side: login -->
    <template v-if="userStore.isAuthenticated">
      <span class="flex items-center justify-end flex-auto p-2">
        <i class="mr-2 text-xl fa-solid fa-user"></i>
        <span class="font-bold">Welcome {{ userStore.user.username }}</span>
      </span>
      <button
        @click="logout"
        class="flex items-center justify-end flex-auto p-2 transition cursor-pointer hover:opacity-85"
      >
        <i class="mr-2 text-xl fa-solid fa-right-from-bracket"></i>
        <span class="font-bold">Logout</span>
      </button>
    </template>
    <template v-else>
      <routerLink
        to="/login"
        class="flex items-center justify-end flex-auto p-2 transition cursor-pointer hover:opacity-85"
      >
        <i class="mr-2 text-xl fa-regular fa-user"></i>
        <span class="font-bold">Login</span>
      </routerLink>
    </template>
  </nav>
</template>
