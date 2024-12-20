import { useToast } from 'vue-toastification';
export const toastService = () => {

  const toast = useToast();

  function showError(msg: string): void {
    toast.error(msg)
  }
  function showSuccess(msg: string): void {
    toast.success(msg)
  }
  function showInfo(msg: string): void {
    toast.info(msg)
  }

  return {
    showError,
    showSuccess,
    showInfo
  }
}