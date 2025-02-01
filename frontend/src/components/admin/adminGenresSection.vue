<script setup>
import { ref, onMounted } from 'vue';
import categoryService from '@/services/category.service';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useToastService } from '@/services/toast.service';

const toastService = useToastService();
const visibleAddGenreDialog = ref(false);
const genres = ref([]);
const newGenre = ref('');

const getGenres = async () => {
  try {
    genres.value = await categoryService.getCategories();
  } catch (error) {
    console.error('Failed to load genres:', error);
  }
};

const addGenre = async () => {
  try {
    await categoryService.addCategory({ name: newGenre.value });
    genres.value = [...genres.value, { name: newGenre.value }];
    newGenre.value = '';
    visibleAddGenreDialog.value = false;
    toastService.success('Genre added successfully');

    getGenres();
  } catch (error) {
    console.error('Failed to add genre:', error);
  }
};

const deleteGenre = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this genre?')) {
      return;
    }
    await categoryService.deleteCategory(id);
    genres.value = genres.value.filter((genre) => genre.id !== id);
    toastService.success('Genre deleted successfully');
  } catch (error) {
    console.error('Failed to delete genre:', error);
    toastService.error('Failed to delete genre');
  }
};

onMounted(() => {
  getGenres();
});
</script>

<template>
  <!-- Genres Section -->
  <div>
    <div class="flex justify-between pb-4">
      <h1 class="text-3xl font-bold">Genres</h1>
      <Button
        label="Add Genre"
        @click="visibleAddGenreDialog = true"
      />
      <Dialog
        v-model:visible="visibleAddGenreDialog"
        modal
        header="Add New Genre"
        :style="{ width: '25rem' }"
      >
        <form @submit.prevent="addGenre">
          <div class="flex items-center gap-4 mb-8">
            <label
              for="genre"
              class="w-24 font-semibold"
              >Genre</label
            >
            <InputText
              required
              id="newGenre"
              v-model="newGenre"
              class="flex-auto"
              autocomplete="off"
            />
          </div>
          <div class="flex justify-end gap-2">
            <Button
              type="button"
              label="Cancel"
              severity="secondary"
              @click="visibleAddGenreDialog = false"
            ></Button>
            <Button
              type="submit"
              label="Add"
            ></Button>
          </div>
        </form>
      </Dialog>
    </div>
    <DataTable
      :paginator="true"
      :rows="10"
      :value="genres"
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
        header="Genre"
        sortable
        style="width: 25%"
      ></Column>
      <Column
        header="Actions"
        style="width: 25%"
      >
        <template #body="slotProps">
          <button
            @click="deleteGenre(slotProps.data.id)"
            class="px-2 py-1 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
