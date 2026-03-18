<template>
  <div class="flex flex-col w-full h-full bg-gray-100 text-blue-800 text-xs rounded-md shadow-md border-4 border-blue-800">
    <div class="flex items-center gap-1 px-2 py-1">
      <Icon name="material-symbols:arrow-forward-rounded" class="shrink-0"/>
      <span class="font-bold truncate">{{ settings.callsign || '—' }}</span>
    </div>
    <div class="border-t border-gray-400 px-2 py-1 font-semibold">
      {{ store.group?.name || '—' }}
    </div>
    <div class="border-t border-gray-400 px-2 py-1">
      {{ store.folder?.name || '—' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeviceStore } from '~/stores/useDeviceStore';
import { useAppSettingsStore } from '~/stores/useAppSettingsStore';

const store = useDeviceStore();
const settings = useAppSettingsStore();
</script>
