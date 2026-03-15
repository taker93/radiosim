<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useNavigationStore} from "~/stores/useNavigationStore";
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";

const navStore = useNavigationStore();
const store = useDeviceStore();
const settings = useAppSettingsStore();

// handle left context actions
function handleLeftButtonClick(event: Event) {
  if (store.locked && store.currentAction != 'toggleLock') {
    event.preventDefault();
    console.log('Aktion blockiert, da der Zustand auf "locked" steht.');
    return;
  }

  // handle font size change (home)
  if (store.currentAction === '') {

  }
  // handle lockmode
  else if (store.currentAction === 'toggleLock') {
    console.log('Toggle lockmode')
    store.toggleLock();
    store.closeCurrentModal();
  }
  // handle group selection
  else if (store.currentAction === 'selectGroup') {
    console.log('Close & confirm group selection')

    store.confirmGroupChange(navStore.currentGroup, navStore.currentFolder);

    store.closeCurrentModal();
    console.debug('Stopping modal timer...');
    settings.stopModalTimer();
  }
}

// handle middle context actions
function handleCenterButtonClick(event: Event) {
  if (store.locked && store.currentAction != 'toggleLock') {
    event.preventDefault();
    console.log('Aktion blockiert, da der Zustand auf "locked" steht.');
    return;
  }

  // handle group selection (home)
  if (store.currentAction === '') {
    console.log('Open GroupSelectionModal')
    store.toggleModal('GroupSelectionModal'); // Modal Zustand umschalten
  }
}

// handle right context actions
function handleRightButtonClick(event: Event) {
  if (store.locked && store.currentAction != 'toggleLock') {
    event.preventDefault();
    console.log('Aktion blockiert, da der Zustand auf "locked" steht.');
    return;
  }

  // handle help (home)
  if (store.currentAction === '' && !store.hasManDownFeature) {
    return;
  }

  if (store.hasManDownFeature) {
    console.log('Activate ManDown Feature');
    if (store.manDownActive) {
      store.toggleManDown();
    } else {
      store.toggleModal('ManDownModal');
    }
  }

  // handle lockmode & group selection
  else if (store.currentAction === 'toggleLock' || store.currentAction === 'selectGroup') {
    console.log('Cancel...')
    store.closeCurrentModal();
  }
}
</script>

<template>
  <div class="px-2 w-full grid grid-cols-3 gap-2 mt-4 text-sm">
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleLeftButtonClick">
      <Icon name="material-symbols:circle-outline"/>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleCenterButtonClick">
      <Icon name="material-symbols:check-box-outline-blank"/>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleRightButtonClick">
      <Icon name="material-symbols:circle-outline"/>
    </button>
  </div>
</template>

<style scoped>
/* Hier kannst du spezifische Styles hinzufügen, falls erforderlich */
</style>