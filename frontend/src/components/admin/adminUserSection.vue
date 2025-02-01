<script setup>
import { ref, onMounted } from 'vue';
import userService from '@/services/user.service';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useToastService } from '@/services/toast.service';

const users = ref([]);
const toastService = useToastService();
defineProps({
  users: Array
});

onMounted(() => {
  getUsers();
});

const getUsers = async () => {
  try {
    users.value = await userService.getUsers();
  } catch (error) {
    console.error('Failed to load users:', error);
    toastService.error('Failed to load users');
  }
};

const deleteUser = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }
    await userService.deleteUser(id);
    users.value = users.value.filter((user) => user.id !== id);
    toastService.success('User deleted successfully');
  } catch (error) {
    console.error('Failed to delete user:', error);
    toastService.error('Failed to delete user');
  }
};
</script>

<template>
  <h1 class="pb-4 text-3xl font-bold">Users</h1>
  <DataTable
    :value="users"
    :paginator="true"
    :rows="10"
  >
    <Column
      sortable
      field="id"
      header="ID"
    ></Column>
    <Column
      sortable
      field="username"
      header="Name"
    ></Column>
    <Column
      sortable
      field="email"
      header="Email"
    ></Column>
    <Column
      sortable
      field="role"
      header="Role"
    ></Column>
    <Column>
      <template #body="slotProps">
        <button
          @click="deleteUser(slotProps.data.id)"
          class="px-2 py-1 text-white bg-red-500 rounded"
        >
          Delete
        </button>
      </template>
    </Column>
  </DataTable>
</template>
