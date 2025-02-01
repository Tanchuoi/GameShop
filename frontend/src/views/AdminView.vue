<script setup>
import { ref, onMounted } from 'vue';
import adminUserSection from '@/components/admin/adminUserSection.vue';
import adminGamesSection from '@/components/admin/adminGamesSection.vue';
import adminGenresSection from '@/components/admin/adminGenresSection.vue';
import userService from '@/services/user.service';
import gameService from '@/services/game.service';
import categoryService from '@/services/category.service';

const users = ref();
const games = ref();
const categories = ref();
const getQuantities = async () => {
  try {
    users.value = await userService.getUsers();
    games.value = await gameService.getGames();
    categories.value = await categoryService.getCategories();
  } catch (error) {
    console.error('Failed to load users:', error);
  }
};

getQuantities();

const activeTab = ref('dashboard');

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>
<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside class="min-h-screen text-white bg-gray-800">
      <div class="p-4 text-2xl font-bold">
        <RouterLink to="/"><i class="fa-solid fa-house-user"></i></RouterLink> Admin
      </div>
      <nav class="mt-4">
        <ul>
          <li>
            <button
              @click="setActiveTab('dashboard')"
              :class="{ 'bg-gray-700': activeTab === 'dashboard' }"
              class="w-full px-4 py-2 text-left"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('users')"
              :class="{ 'bg-gray-700': activeTab === 'users' }"
              class="w-full px-4 py-2 text-left"
            >
              Users
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('games')"
              :class="{ 'bg-gray-700': activeTab === 'games' }"
              class="w-full px-4 py-2 text-left"
            >
              Games
            </button>
          </li>
          <li>
            <button
              @click="setActiveTab('genres')"
              :class="{ 'bg-gray-700': activeTab === 'genres' }"
              class="w-full px-4 py-2 text-left"
            >
              Genres
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-100">
      <div v-if="activeTab === 'dashboard'">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <!-- Number of users -->
          <div class="grid p-4 mt-4 bg-red-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-user"></i>User</h2>
            <p class="p-2 font-bold">{{ users?.length ?? 0 }}</p>
          </div>
          <!-- Number of games -->
          <div class="grid p-4 mt-4 bg-green-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-gamepad"></i>Games</h2>
            <p class="p-2 font-bold">{{ games?.length ?? 0 }}</p>
          </div>
          <!-- Number of genres -->
          <div class="grid p-4 mt-4 bg-blue-300 rounded-lg shadow">
            <h2 class="text-xl font-bold"><i class="p-2 fa-solid fa-inbox"></i>Genres</h2>
            <p class="p-2 font-bold">{{ categories?.length ?? 0 }}</p>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'users'">
        <adminUserSection />
      </div>
      <div v-if="activeTab === 'games'">
        <adminGamesSection />
      </div>
      <div v-if="activeTab === 'genres'">
        <adminGenresSection />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
