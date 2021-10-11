import { ref } from "vue";

export default () => {
  const showBackdrop = ref(false);
  const isBackdropClosable = ref(true);
  const showContactDialog = ref(false);
  const showCustomDialog = ref(false);

  const closeAllDialog = () => {
    showBackdrop.value = false;
    showContactDialog.value = false;
    showCustomDialog.value = false;
  };

  const openDialog =
    (fn: any, closable = true) =>
    () => {
      closeAllDialog();
      showBackdrop.value = true;
      isBackdropClosable.value = closable;
      fn();
    };

  const clickCloseDialog = () => {
    if (!isBackdropClosable.value) {
      return;
    }
    closeAllDialog();
  };

  const openContactDialog = openDialog(() => {
    showContactDialog.value = true;
  });

  const openCustomDialog = openDialog(() => {
    showCustomDialog.value = true;
  });

  return {
    showBackdrop,
    isBackdropClosable,
    closeAllDialog,
    clickCloseDialog,
    showContactDialog,
    openContactDialog,
    showCustomDialog,
    openCustomDialog,
  };
};
