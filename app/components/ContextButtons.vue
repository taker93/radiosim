<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useContextActions} from "~/composables/useContextActions";

const store = useDeviceStore();
const {getHandler, isBlocked} = useContextActions();

function handleButtonClick(event: Event, buttonRole: string) {
  if (isBlocked()) {
    event.preventDefault();
    console.log('Aktion blockiert, da der Zustand auf "locked" steht.');
    return;
  }
  getHandler(buttonRole)?.();
}
</script>

<template>
  <div class="px-2 w-full grid gap-2 text-sm" :class="store.activeProfile.styles.contextButtons.marginTopClass"
       :style="{ gridTemplateColumns: `repeat(${store.activeProfile.contextButtons.length}, 1fr)` }">
    <button
        v-for="btn in store.activeProfile.contextButtons"
        :key="btn.id"
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleButtonClick($event, btn.role)">
      <Icon :name="btn.icon ?? 'material-symbols:circle-outline'"/>
    </button>
  </div>
</template>

<style scoped>
/* Hier kannst du spezifische Styles hinzufügen, falls erforderlich */
</style>
