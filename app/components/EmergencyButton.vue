<template>
  <div class="flex flex-col items-center gap-0.5">
    <!-- Guard-Ring + Button -->
    <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center ring-2 ring-gray-600">
      <button
          class="w-7 h-7 rounded-full select-none"
          :class="[
            store.isPoweredOff || store.isBooting ? 'bg-red-900 opacity-50 cursor-not-allowed' : 'bg-red-700 hover:bg-red-600 active:bg-red-800',
          ]"
          @click="store.triggerEmergency()"
      />
    </div>
    <span class="text-[8px] text-gray-400 leading-none">Notruf</span>
  </div>
</template>

<script setup lang="ts">
import { useDeviceStore } from '~/stores/useDeviceStore';

const store = useDeviceStore();
</script>
