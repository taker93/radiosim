<script lang="ts" setup>
import {useSound} from '@/composables/useSound';
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";

const settings = useAppSettingsStore();

const {playSound} = useSound();
onMounted(() => {
  // Event Listener hinzufügen
  const handleButtonClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const radioDevice = document.getElementById('radio-device');
    if (target.tagName === 'BUTTON' && radioDevice?.contains(target) && !target.dataset.ptt) {
      playSound('/sounds/button_sound.wav');
      settings.resetModalTimer();
    }
  };

  document.addEventListener('click', handleButtonClick);

  // Event Listener entfernen, wenn die Komponente zerstört wird
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleButtonClick);
  });
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
button span {
  pointer-events: none;
}
</style>