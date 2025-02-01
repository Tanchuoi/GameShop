<script setup>
import { ref, onMounted, computed } from 'vue';
import gameService from '@/services/game.service';
import categoryService from '@/services/category.service';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import FileUpload from 'primevue/fileupload';
import { useToastService } from '@/services/toast.service';

const toastService = useToastService();
const games = ref([]);
const categories = ref([]);
const selectedCategories = ref([]);
const selectedFiles = ref([]);
const imagePreviews = ref([]);
const visible = ref(false);
const isEditing = ref(false); // New flag for add/edit mode
const selectedGame = ref({
  name: '',
  price: null,
  categories: [],
  images: [],
  description: '',
  platform: '',
  developer: '',
  publisher: '',
  release_day: null,
  stock: null
});

// Fetch games with their categories
const getGames = async () => {
  try {
    const allGames = await gameService.getGames();
    const gamesWithCategoriesAndImages = await Promise.all(
      allGames.map(async (game) => {
        const categories = await categoryService.getGameCategories(game.id);
        const images = await gameService.getGameImages(game.id);
        // Adjust `release_day` to be in the local date format
        game.release_day = new Date(game.release_day).toLocaleDateString('en-GB'); // 'en-GB' for dd/mm/yyyy

        return { ...game, categories, images };
      })
    );
    games.value = gamesWithCategoriesAndImages;
  } catch (error) {
    console.error('Failed to load games:', error);
  }
};

// Fetch all categories
const getCategories = async () => {
  try {
    categories.value = await categoryService.getCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// Add or Update the game based on the mode
const saveGame = async () => {
  try {
    const formData = new FormData();
    formData.append('name', selectedGame.value.name);
    formData.append('price', selectedGame.value.price);
    formData.append('description', selectedGame.value.description);
    formData.append('platform', selectedGame.value.platform);
    formData.append('developer', selectedGame.value.developer);
    formData.append('publisher', selectedGame.value.publisher);
    if (
      selectedGame.value.release_day &&
      selectedGame.value.release_day instanceof Date &&
      !isNaN(selectedGame.value.release_day)
    ) {
      formData.append('release_day', selectedGame.value.release_day.toISOString().split('T')[0]);
    } else {
      console.warn('Release date is not set correctly.');
      formData.append('release_day', '');
    }
    formData.append('stock', selectedGame.value.stock);

    // Append selected images to the form data
    selectedFiles.value.forEach((file) => {
      formData.append('images', file);
    });

    // Append selected categories to the form data
    selectedCategories.value.forEach((genreId) => {
      formData.append('genres', genreId);
    });

    if (isEditing.value) {
      await gameService.updateGame(selectedGame.value.id, formData);
      toastService.success('Game updated successfully');
    } else {
      await gameService.createGame(formData);
      toastService.success('Game added successfully');
    }
    getGames();
    closeDialog();
  } catch (error) {
    console.error('Failed to save game:', error);
    toastService.error('Failed to save game');
  }
};

const deleteGame = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this game?')) {
      return;
    }
    await gameService.deleteGame(id);
    games.value = games.value.filter((game) => game.id !== id);
    toastService.success('Game deleted successfully');
  } catch (error) {
    console.error('Failed to delete game:', error);
    toastService.error('Failed to delete game');
  }
};

const onImageChange = (event) => {
  const files = event.files;
  if (files && files.length) {
    selectedFiles.value = files;
    imagePreviews.value = files.map((file) => URL.createObjectURL(file));
  }
};

const triggerFileUpload = () => {
  console.log('Triggering file upload', selectedFiles.value);
  const fileInput = document.getElementById('images');
  fileInput.click();
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const openDialog = (game = null) => {
  isEditing.value = !!game;
  if (isEditing.value) {
    selectedGame.value = { ...game };

    // Convert release_day to a Date object
    selectedGame.value.release_day = game.release_day
      ? new Date(game.release_day.split('/').reverse().join('-')) // Parse dd/mm/yyyy to Date
      : null;

    selectedCategories.value = game.categories.map((category) => category.id);
    selectedFiles.value = game.images.map((image) => image.image);
    imagePreviews.value = game.images.map((image) => `/${image.image}`);
  } else {
    closeDialog();
  }
  visible.value = true;
};

// Clear selected game data on close
const closeDialog = () => {
  selectedGame.value = {
    name: '',
    price: null,
    categories: [],
    description: '',
    platform: '',
    developer: '',
    publisher: '',
    release_day: null,
    stock: null
  };
  selectedFiles.value = [];
  imagePreviews.value = [];
  selectedCategories.value = [];
  visible.value = false;
};

onMounted(() => {
  getGames();
  getCategories();
});
</script>

<template>
  <div class="flex justify-between pb-4">
    <h1 class="text-3xl font-bold">Games</h1>
    <Button
      label="Add Game"
      @click="openDialog()"
    />
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      :header="isEditing ? 'Edit Game' : 'Add Game'"
      :style="{ width: '25rem' }"
    >
      <!-- Game Name -->
      <div class="flex items-center gap-4 mb-4">
        <label
          for="gameName"
          class="w-24 font-semibold"
          >Name</label
        >
        <InputText
          v-model="selectedGame.name"
          id="gameName"
          class="flex-auto"
          autocomplete="off"
          required
        />
      </div>

      <!-- Game Price -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="gamePrice"
          class="w-24 font-semibold"
          >Price</label
        >
        <InputText
          v-model="selectedGame.price"
          id="gamePrice"
          class="flex-auto"
        />
      </div>

      <!-- Game Categories -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="categories"
          class="w-24 font-semibold"
          >Categories</label
        >
        <MultiSelect
          v-model="selectedCategories"
          :options="categories"
          optionLabel="name"
          optionValue="id"
          placeholder="Choose categories"
        />
      </div>

      <div class="flex items-center gap-4 mb-8">
        <label
          for="images"
          class="w-24 font-semibold"
          >Images</label
        >
        <FileUpload
          id="images"
          mode="basic"
          multiple
          accept="image/*"
          @select="onImageChange"
          :maxFileSize="5000000"
          :auto="false"
          :customUpload="true"
          @upload="triggerFileUpload"
        />
        <img
          v-for="preview in imagePreviews"
          :key="preview"
          :src="preview"
          alt="Game Image"
          class="object-contain w-16 h-16"
        />
      </div>

      <!-- Game Description -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="gameDescription"
          class="w-24 font-semibold"
          >Description</label
        >
        <Textarea
          v-model="selectedGame.description"
          id="gameDescription"
          class="flex-auto"
          rows="2"
          cols="10"
          autoResize
        />
      </div>

      <!-- Game Platforms -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="gamePlatforms"
          class="w-24 font-semibold"
          >Platforms</label
        >
        <InputText
          v-model="selectedGame.platform"
          id="gamePlatform"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <!-- Game Developer -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="gameDeveloper"
          class="w-24 font-semibold"
          >Developer</label
        >
        <InputText
          v-model="selectedGame.developer"
          id="gameDeveloper"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <!-- Game Publisher -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="gamePublisher"
          class="w-24 font-semibold"
          >Publisher</label
        >
        <InputText
          v-model="selectedGame.publisher"
          id="gamePublisher"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <!-- Game Release Date -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="gameRelease_day"
          class="w-24 font-semibold"
          >Release Date</label
        >
        <DatePicker
          v-model="selectedGame.release_day"
          id="gameRelease_day"
          class="flex-auto"
          date-format="dd/mm/yy"
          :showIcon="true"
        />
      </div>

      <!-- Game Stock -->
      <div class="flex items-center gap-4 mb-8">
        <label
          for="gameStock"
          class="w-24 font-semibold"
          >Stock</label
        >
        <InputNumber
          v-model="selectedGame.stock"
          id="gameStock"
          class="flex-auto"
          autocomplete="off"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="closeDialog"
        />
        <Button
          type="button"
          label="Save"
          @click="saveGame"
        />
      </div>
    </Dialog>
  </div>

  <div class="overflow-auto border rounded-lg">
    <DataTable
      scrollable
      paginator
      :rows="3"
      scrollHeight="750px"
      :value="games"
      tableStyle="min-width: 50rem"
    >
      <Column
        field="id"
        header="ID"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="name"
        header="Name"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="price"
        header="Price"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="platform"
        header="Platforms"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="developer"
        header="Developer"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="publisher"
        header="Publisher"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="description"
        header="Description"
        style="width: 25%"
      >
        <template #body="slotProps">
          {{ truncateText(slotProps.data.description, 50) }}
        </template>
      </Column>
      <Column
        field="release_day"
        header="Release Date"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        field="stock"
        header="Stock"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        header="Categories"
        style="width: 25%"
      >
        <template #body="slotProps">
          {{ slotProps.data.categories.map((category) => category.name).join(', ') }}
        </template>
      </Column>
      <Column
        header="Images"
        style="width: 25%"
      >
        <template #body="slotProps">
          <div class="space-y-1">
            <img
              v-for="image in slotProps.data.images"
              :key="image.id"
              :src="`/${image.image}`"
              alt="Game Image"
              class="object-contain"
            />
          </div>
        </template>
      </Column>

      <!-- Edit/Delete Buttons -->
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-1">
            <button
              @click="openDialog(slotProps.data)"
              class="px-2 py-1 text-white bg-blue-500 rounded"
            >
              Edit
            </button>
            <button
              @click="deleteGame(slotProps.data.id)"
              class="px-2 py-1 text-white bg-red-500 rounded"
            >
              Delete
            </button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
