<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-white bg-dark-gray">
    <div class="text-center">
      <h1 class="text-6xl font-bold">404</h1>
      <p class="mt-4 text-2xl">Oops! Page Not Found</p>
      <router-link
        to="/"
        class="inline-block px-6 py-3 mt-6 text-white rounded-full bg-main-blue hover:bg-hover-blue"
      >
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.bg-dark-gray {
  background-color: #1a1a1a;
}

.bg-main-blue {
  background-color: #2579f2;
}

.hover\:bg-hover-blue:hover {
  background-color: #1a5bbf;
}
</style>
