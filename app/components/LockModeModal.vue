<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import type {Contexts} from "~/types/interfaces";

const store = useDeviceStore();

function setCurrentAction() {
  store.setCurrentAction('toggleLock'); // Setzt die aktuelle Aktion auf "toggleLock"
}

let timeoutHandle: number;

// Bei Mount wird die aktuelle Aktion gesetzt
onMounted(() => {
  setCurrentAction();

  const contextMenu: Contexts = {left: 'OK', middle: null, right: 'Abbruch'};
  store.setContexts(contextMenu);
  
  // Startet den Timer zum automatischen Schließen nach 5 Sekunden
  timeoutHandle = window.setTimeout(() => {
    store.closeCurrentModal();  // Modal schließen
    store.resetContextmenu();
  }, 2 * 1000);
});

onBeforeUnmount(() => {
  // Löscht den Timer, falls die Komponente vorzeitig zerstört wird
  if (timeoutHandle) {
    clearTimeout(timeoutHandle);
  }

  // Das Contextmenu auf den Home-Zustand zuruecksetzen
  store.resetContextmenu();
  store.setCurrentAction('');
});
</script>

<template>
  <div v-if="store.locked"
       class="p-1 w-full text-center text-black text-lg bg-gray-100 rounded-md shadow-md border-4 border-blue-800">
    Sperre aufheben ?
  </div>
  <div v-else
       class="p-1 w-full text-center text-black text-lg bg-gray-100 rounded-md shadow-md border-4 border-blue-800">
    Tastensperre ein ?
  </div>
</template>

<style scoped>

</style>