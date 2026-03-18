<script setup lang="ts">
import { useDeviceStore } from '@/stores/useDeviceStore';
import type { Contexts } from '~/types/interfaces';
import { useSound } from '~/composables/useSound';

const store = useDeviceStore();

let timeoutHandle: number;

onMounted(() => {
  store.setCurrentAction('emergency');

  const contextMenu: Contexts = { left: 'Abbrechen', middle: null, right: null };
  store.setContexts(contextMenu);

  const { playSound } = useSound();
  playSound('/sounds/fail.wav');

  timeoutHandle = window.setTimeout(() => {
    store.cancelEmergency();
    store.resetContextmenu();
  }, 30 * 1000);
});

onBeforeUnmount(() => {
  if (timeoutHandle) {
    clearTimeout(timeoutHandle);
  }
  store.resetContextmenu();
  store.setCurrentAction('');
});
</script>

<template>
  <div class="p-2 w-full text-center bg-gray-100 rounded-md shadow-md border-4 border-red-700">
    <p class="text-black font-bold text-lg">NOTRUF</p>
    <p class="text-red-700 text-sm font-semibold">Notruf aktiv</p>
  </div>
</template>
