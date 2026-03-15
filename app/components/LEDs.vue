<script setup lang="ts">
import {useDeviceStore} from "~/stores/useDeviceStore";

const store = useDeviceStore();

const {led1Color, led2Color} = storeToRefs(store);

function getColor(color: string): string {
  switch (color) {
    case 'red':
      return 'bg-red-500';
    case 'green':
      return 'bg-green-500 animate-pulse';
    case 'blue':
      return 'bg-blue-500';
    case 'yellow':
      return 'bg-yellow-500';
    default:
      return '';
  }
}

const led1Class = computed(() => {
  return getColor(led1Color.value);
})

const led2Class = computed(() => {
  return getColor(led2Color.value);
})
</script>

<template>
  <div class="flex ml-4 mb-2 space-x-2">
    <div class="w-2 h-8 bg-gray-600" :class="led1Class"></div>
    <div class="w-2 h-8 bg-gray-600" :class="led2Class"></div>
  </div>
</template>

<style scoped>
/* Hier kannst du spezifische Styles für die LEDs hinzufügen, falls erforderlich */
</style>