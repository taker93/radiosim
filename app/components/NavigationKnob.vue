<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useNavigationStore} from '@/stores/useNavigationStore';

const navStore = useNavigationStore();
const store = useDeviceStore();

function handleNaviKnob(direction: string) {
  // Aktion basierend auf dem Zustand des Stores ausführen
  switch (store.currentAction) {
    case 'selectGroup':
      handleGroupSelection(direction);
      break;
      // Weitere Aktionen je nach Modal oder Ansicht hinzufügen
    default:
      console.log(`Keine definierte Aktion für ${direction}`);
  }
}

function handleGroupSelection(direction: string) {
  console.log(`Handle ${direction}`);
  navStore.navigateGroup(direction);
}
</script>

<template>
  <div class="h-14 w-10 bg-gray-800 rounded-t-lg">
    <button class="absolute top-1/4 -left-6" @click="handleNaviKnob('counterclockwise')">
      <Icon class="transform -scale-y-100 -rotate-180 text-blue-600 text-4xl"
            name="line-md:rotate-180"/>
    </button>
    <button class="absolute top-1/4 -right-6" @click="handleNaviKnob('clockwise')">
      <Icon class="text-blue-600 text-4xl" name="line-md:rotate-180"/>
    </button>
  </div>
</template>

<style scoped>

</style>