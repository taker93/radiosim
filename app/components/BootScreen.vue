<script lang="ts" setup>
import {useDeviceStore} from '@/stores/useDeviceStore';

const store = useDeviceStore();

const s = computed(() => store.activeProfile.styles.bootScreen);

const {playSound} = useSound();

let boottimer: number;

onMounted(() => {
  store.led1Color = 'green';

  boottimer = window.setTimeout(() => {
    store.led1Color = '';
    store.isBooting = false;
    playSound('/sounds/mode_change.wav')
  }, 5000);
});

onBeforeUnmount(() => {
  if (boottimer) {
    clearTimeout(boottimer);
  }
});

</script>

<template>
  <div class="w-full flex items-center justify-center bg-gray-200">
    <span :class="s.logoSize" class="text-gray-800">
      Funk<span class="text-blue-800">Sim</span><span :class="s.superscriptSize" class="align-super font-medium">OS</span>
    </span>
  </div>
</template>
