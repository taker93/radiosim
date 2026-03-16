<script setup lang="ts">
import {useDeviceStore} from '~/stores/useDeviceStore';
import {useAppSettingsStore} from '~/stores/useAppSettingsStore';

const device = useDeviceStore();
const settings = useAppSettingsStore();
const sideBySide = computed(() => device.activeProfile.pageLayout === 'side-by-side');

onMounted(() => {
  settings.loadWelcomeState();
});
</script>

<template>

  <div
      class="flex flex-1 items-center justify-center bg-gray-200"
      :class="sideBySide ? 'flex-col lg:flex-row lg:space-x-16' : 'flex-col space-y-4 pb-4'">

    <!-- Funkgeraet -->
    <div :class="!sideBySide ? 'w-full max-w-screen-xl px-4' : ''">
      <RadioDevice/>
    </div>

    <!-- Welcome Message (oben bei stacked via -order-1, rechts bei side-by-side) -->
    <div v-if="!settings.welcomeMessageClosed"
         :class="sideBySide ? 'max-w-xs lg:max-w-screen-sm' : 'w-full max-w-screen-md px-4 -order-1'">
      <div class="relative p-4 bg-white border border-gray-300 rounded-md shadow-md">
        <button
            class="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            @click="settings.closeWelcomeMessage()">
          <Icon name="material-symbols:close-rounded" class="w-5 h-5"/>
        </button>
        <h1 class="text-2xl font-bold mb-2">Willkommen bei Funk<span class="text-blue-800">Sim</span></h1>
        <p>
          Eine einfache Simulation eines BOS-Funkgeräts zum Trainieren und Üben der Bedienung.
        </p>
        <p>
          Um zu Starten klicke eine Sekunde lang auf die Taste
          <span class="inline p-1 m-1 border border-gray-200 w-8 h-8 bg-gray-600 rounded">
             <Icon class="text-red-600" name="material-symbols:phone-disabled-rounded"/>
          </span>.
          Im Anschluss daran wird das Gerät hochfahren.
        </p>
        <p class="mt-4">
          Bei Ideen und Fragen zur Anwendung kannst du dich an <a href="mailto:lucas@nur-kurz.de"
                                                                  class="underline">per Mail</a> an uns wenden.
        </p>
      </div>
    </div>

    <!-- Konfigurationskomponente (bei stacked immer unter Funkgeraet) -->
    <div class="mb-4"
         :class="sideBySide ? 'lg:block max-w-xs lg:max-w-screen-sm' : 'w-full max-w-screen-md px-4'">
      <ConfigurationSettings />
    </div>
  </div>

</template>

<style scoped>
/* Optionale globale Styles */
</style>
