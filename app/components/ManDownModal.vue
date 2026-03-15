<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import type {Contexts} from "~/types/interfaces";
import {useSound} from "~/composables/useSound";

const store = useDeviceStore();

function setCurrentAction() {
  store.setCurrentAction('toggleManDown'); // Setzt die aktuelle Aktion auf "toggleLock"
}

let timeoutHandle: number;

// Bei Mount wird die aktuelle Aktion gesetzt
onMounted(() => {
  setCurrentAction();

  const contextMenu: Contexts = {left: null, middle: null, right: null};
  store.setContexts(contextMenu);

  const {playSound} = useSound();
  playSound('/sounds/mandown_sound.wav');

  // Startet den Timer zum automatischen Schließen nach 12 Sekunden
  timeoutHandle = window.setTimeout(() => {
    store.toggleManDown();
    store.closeCurrentModal();  // Modal schließen
    store.resetContextmenu();
  }, 9.8 * 1000);
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
  <div class="p-1 w-full text-center text-black text-lg bg-gray-100 rounded-md shadow-md border-4 border-blue-800">
    Totmann starten
  </div>
</template>

<style scoped>

</style>