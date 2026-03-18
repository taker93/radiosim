<template>
  <button
      class="w-full h-7 rounded-md text-white text-xs font-bold select-none"
      :class="isDisabled ? 'bg-gray-700 opacity-50 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-500 active:bg-gray-500'"
      @click="!isDisabled && store.pressFunctionButton()"
  ><slot/></button>
</template>

<script setup lang="ts">
import { useDeviceStore } from '~/stores/useDeviceStore';

const store = useDeviceStore();
const isDisabled = computed(() => store.isPoweredOff || store.isBooting || store.locked);
</script>
