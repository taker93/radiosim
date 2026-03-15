<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import type {Contexts} from "~/types/interfaces";
import {useSound} from "~/composables/useSound";

const store = useDeviceStore();

function setCurrentAction() {
  store.setCurrentAction('manDownWarning'); // Setzt die aktuelle Aktion auf "toggleLock"
}

const {playSound, stopSound} = useSound();

let sound: HTMLAudioElement;

// Bei Mount wird die aktuelle Aktion gesetzt
onMounted(() => {
  setCurrentAction();

  const contextMenu: Contexts = {left: null, middle: null, right: null};
  store.setContexts(contextMenu);

  playSound('/sounds/mandown_warning.wav', true);
});

onBeforeUnmount(() => {
  stopSound();

  // Das Contextmenu auf den Home-Zustand zuruecksetzen
  store.resetContextmenu();
  store.setCurrentAction('');
});
</script>

<template>
  <div class="p-1 w-full text-center text-black text-lg bg-gray-100 rounded-md shadow-md border-4 border-blue-800">
    Totmann Warnung!
  </div>
</template>

<style scoped>

</style>