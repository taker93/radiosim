<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useNavigationStore} from '@/stores/useNavigationStore';

const navStore = useNavigationStore();
const store = useDeviceStore();

const variant = computed(() => store.activeProfile.styles.navigationKnob.variant);

function handleNaviKnob(direction: string) {
  switch (store.currentAction) {
    case 'selectGroup':
      navStore.navigateGroup(direction);
      break;
    default:
      // NONE
  }
}
</script>

<template>
  <!-- Seitenansicht (LK24): rechteckiges Element das aus dem Gerät herausragt -->
  <template v-if="variant === 'side'">
    <div class="relative h-14 w-10 bg-gray-800 rounded-t-lg overflow-hidden">
      <!-- Linke Hälfte: gegen den Uhrzeigersinn -->
      <button
          class="absolute inset-y-0 left-0 w-1/2 rounded-tl-lg hover:bg-white/5 active:bg-white/10 flex items-center justify-center"
          @click="handleNaviKnob('counterclockwise')">
        <Icon class="transform -scale-y-100 -rotate-180 text-blue-600 text-2xl" name="line-md:rotate-180"/>
      </button>
      <!-- Rechte Hälfte: im Uhrzeigersinn -->
      <button
          class="absolute inset-y-0 right-0 w-1/2 rounded-tr-lg hover:bg-white/5 active:bg-white/10 flex items-center justify-center"
          @click="handleNaviKnob('clockwise')">
        <Icon class="text-blue-600 text-2xl" name="line-md:rotate-180"/>
      </button>
    </div>
  </template>

  <!-- Frontalansicht (LKCC): runder Drehknopf -->
  <template v-else-if="variant === 'front'">
    <div class="relative w-20 h-20">
      <!-- Knob-Körper: helleres Grau mit Schatten zum Abheben vom Hintergrund -->
      <div class="w-20 h-20 rounded-full bg-gray-500 shadow-[0_4px_16px_rgba(0,0,0,0.9)] ring-2 ring-gray-400/60 pointer-events-none flex items-center justify-center">
      </div>
      <!-- Linke Hälfte: gegen den Uhrzeigersinn -->
      <button
          class="absolute inset-y-0 left-0 w-1/2 rounded-l-full hover:bg-white/5 active:bg-white/10 flex items-start justify-center pt-1"
          @click="handleNaviKnob('counterclockwise')">
        <Icon class="transform -scale-y-100 -rotate-180 text-white text-4xl" name="line-md:rotate-90"/>
      </button>
      <!-- Rechte Hälfte: im Uhrzeigersinn -->
      <button
          class="absolute inset-y-0 right-0 w-1/2 rounded-r-full hover:bg-white/5 active:bg-white/10 flex items-start justify-center pt-1"
          @click="handleNaviKnob('clockwise')">
        <Icon class="text-white text-4xl" name="line-md:rotate-90"/>
      </button>
    </div>
  </template>
</template>

<style scoped>
</style>
