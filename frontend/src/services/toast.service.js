import { useToast } from 'primevue/usetoast';

export const useToastService = () => {
  const toast = useToast();

  const success = (message) => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
      life: 3000
    });
  };

  const error = (message) => {
    toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000, closable: true });
  };

  const infor = (message) => {
    toast.add({ severity: 'info', summary: 'Info', detail: message, life: 3000, closable: true });
  };

  return { success, error, infor };
};
