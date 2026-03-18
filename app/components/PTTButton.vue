<template>
  <button
      data-ptt="true"
      class="w-full rounded-md text-white text-xs font-bold tracking-wider select-none"
      :class="[
        store.activeProfile.styles.sidePanel?.pttHeightClass ?? 'h-20',
        isDisabled ? 'bg-gray-700 opacity-50 cursor-not-allowed' : (store.isPTTActive ? 'bg-gray-500' : 'bg-gray-600 hover:bg-gray-500 active:bg-gray-500'),
      ]"
      @mousedown="onPress"
      @mouseup="onRelease"
      @mouseleave="onRelease"
      @touchstart.prevent="onPress"
      @touchend.prevent="onRelease"
  >
    <span class="[writing-mode:vertical-rl] rotate-180">PTT</span>
  </button>
</template>

<script setup lang="ts">
import { useDeviceStore } from '~/stores/useDeviceStore';
import { useSound } from '~/composables/useSound';

const store = useDeviceStore();
const { playSound } = useSound();

const isDisabled = computed(() => store.isPoweredOff || store.isBooting || store.locked);

const callEndTimer = ref<ReturnType<typeof setTimeout> | null>(null);

function onPress() {
  if (isDisabled.value) return;
  store.activatePTT();
  if (callEndTimer.value) {
    clearTimeout(callEndTimer.value);
    callEndTimer.value = null;
    playSound('/sounds/continue_call.wav');
  } else {
    playSound('/sounds/start_call.wav');
  }
}

function onRelease() {
  if (!store.isPTTActive) return;
  store.deactivatePTT();
  callEndTimer.value = setTimeout(() => {
    playSound('/sounds/end_call.wav');
    store.endPTTCall();
    callEndTimer.value = null;
  }, 5000);
}
</script>
