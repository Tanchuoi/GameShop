<script setup></script>

<template>
  <footer class="px-4 py-8 text-white bg-main-black">
    <!-- Top section with Game Store logo and links -->
    <div class="grid grid-cols-1 gap-8 mb-6 md:grid-cols-5">
      <!-- Logo and company name -->
      <div class="flex items-start col-span-1 md:col-span-2">
        <i class="p-2 text-3xl fa-solid fa-gamepad"></i>
        <span class="pt-2 ml-2 text-2xl font-bold">Game Store</span>
      </div>

      <!-- Link Sections -->
      <div>
        <h4 class="mb-2 font-bold">Company</h4>
        <ul>
          <li>
            <a
              href="#"
              class="hover:underline"
              >About</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Press Center</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Careers</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-bold">Consoles</h4>
        <ul>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Playstation 5</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Xbox One</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Switch</a
            >
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mb-2 font-bold">Resources</h4>
        <ul>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Help Center</a
            >
          </li>
          <li>
            <a
              href="#"
              class="hover:underline"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom section with app links, social icons, and legal -->
    <div
      class="flex flex-col items-center justify-between pt-6 border-t border-gray-700 md:flex-row"
    >
      <!-- Legal text and credit -->
      <div class="mb-4 text-center md:text-left md:mb-0">
        <p>This page was built solely for educational purposes.</p>
        <div class="mt-2">
          <a
            href="#"
            class="text-sm hover:underline"
            >Privacy</a
          >
          <span class="mx-2">|</span>
          <a
            href="#"
            class="text-sm hover:underline"
            >Security</a
          >
          <span class="mx-2">|</span>
          <a
            href="#"
            class="text-sm hover:underline"
            >Cookies</a
          >
          <span class="mx-2">|</span>
          <a
            href="#"
            class="text-sm hover:underline"
            >Legal</a
          >
          <span class="mx-2">|</span>
          <a
            href="#"
            class="text-sm hover:underline"
            >Collaborative Guidelines</a
          >
        </div>
      </div>

      <!-- App store buttons -->
      <div class="flex items-center justify-center mb-4 md:mb-0">
        <a
          href="#"
          class="mr-4"
        >
          <img
            src="../assets/image/png-clipart-app-store-logo-and-symbol-tech-companies.png"
            alt="Google Play"
            class="w-32"
          />
        </a>
        <a href="#">
          <img
            src="../assets/image/Download_on_the_App_Store_RGB_blk.svg.png"
            alt="App Store"
            class="w-32"
          />
        </a>
      </div>

      <!-- Social icons -->
      <div class="flex items-center justify-center">
        <a
          href="#"
          class="mx-2"
        >
          <i class="text-xl fa-brands fa-twitter"></i>
        </a>
        <a
          href="#"
          class="mx-2"
        >
          <i class="text-xl fa-brands fa-instagram"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
