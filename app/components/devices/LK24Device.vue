<template>
  <div id="radio-device" class="flex flex-col my-4">

    <!-- Obere Zeile: Platzhalter | Drehknopf | Oberseite-Panel | Antenne -->
    <div class="flex flex-row">

      <!-- Platzhalter: gleiche Breite + Margin wie das Seitenansicht-Panel -->
      <div
          v-if="store.activeProfile.hardware.hasPTT || store.activeProfile.hardware.hasFunctionButtons"
          class="mr-2 shrink-0"
          :class="store.activeProfile.styles.sidePanel?.widthClass ?? 'w-14'"
      />

      <!-- Freistehende Elemente, exakt w-72 breit -->
      <div class="relative w-72 flex flex-row items-end">

        <NavigationKnob class="ml-4 shrink-0"/>

        <!-- Mitte: Label + Oberseite-Panel, zentriert zwischen Knob und Antenne -->
        <div class="flex-1 flex flex-col items-center justify-end mb-2 gap-0.5">
          <p v-if="store.activeProfile.hardware.hasEmergencyButton" class="text-[9px] text-gray-500">Oberseite</p>
          <div v-if="store.activeProfile.hardware.hasEmergencyButton" class="bg-gray-800 rounded-xl p-2">
            <EmergencyButton/>
          </div>
        </div>

        <!-- Platzhalter gleicher Breite wie die Antenne, damit flex-1 korrekt zentriert -->
        <div class="mr-4 w-10 shrink-0"/>

        <!-- Antenne: absolut positioniert, höher als der Drehknopf, verändert keine Seitenhöhe -->
        <div class="absolute right-4 bottom-0 w-10 h-28 bg-gray-800 rounded-t-2xl"/>

      </div>
    </div>

    <!-- Hauptzeile: Seitenansicht-Panel + Gerätekörper -->
    <div class="flex flex-row items-stretch">

      <!-- Seitenansicht-Panel (Tasten oben, mr-2 = Abstand zum Gerätekörper) -->
      <!-- Label ist absolut links außerhalb des Panels positioniert -->
      <div
          v-if="store.activeProfile.hardware.hasPTT || store.activeProfile.hardware.hasFunctionButtons"
          class="relative bg-gray-800 rounded-xl flex flex-col items-center justify-start p-2 gap-2 mr-2 shrink-0"
          :class="store.activeProfile.styles.sidePanel?.widthClass ?? 'w-14'"
      >
        <p class="absolute right-full top-1/2 -translate-y-1/2 mr-1.5 text-[9px] text-gray-500 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">Seitenansicht</p>
        <template v-if="store.activeProfile.hardware.hasFunctionButtons">
          <FunctionButton>A</FunctionButton>
          <FunctionButton>B</FunctionButton>
        </template>
        <PTTButton v-if="store.activeProfile.hardware.hasPTT"/>
        <FunctionButton v-if="store.activeProfile.hardware.hasFunctionButtons">C</FunctionButton>
      </div>

      <!-- Gerätekörper -->
      <div class="bg-gray-800 min-w-72 w-72 max-w-72 rounded-xl text-white shadow-lg">
        <LEDs/>
        <div class="flex flex-col items-center pb-4">
          <Screen/>
          <ContextButtons/>
          <NavigationButtons/>
          <Keypad/>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import LEDs from '~/components/LEDs.vue';
import Screen from '~/components/Screen.vue';
import ContextButtons from '~/components/ContextButtons.vue';
import NavigationButtons from '~/components/NavigationButtons.vue';
import Keypad from '~/components/Keypad.vue';
import NavigationKnob from '~/components/NavigationKnob.vue';
import PTTButton from '~/components/PTTButton.vue';
import FunctionButton from '~/components/FunctionButton.vue';
import EmergencyButton from '~/components/EmergencyButton.vue';
import { useDeviceStore } from '~/stores/useDeviceStore';

const store = useDeviceStore();
</script>
