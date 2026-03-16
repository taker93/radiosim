<template>
  <div id="radio-device" class="my-4 w-full">
    <div class="bg-gray-800 mx-auto w-[750px] h-full rounded-xl text-white shadow-lg flex flex-row overflow-hidden">

      <!-- Spalte 1: Drehknopf + Notruf-Taste -->
      <div class="shrink-0 w-[140px] flex flex-col items-center justify-evenly py-4 px-3">
        <NavigationKnob/>

        <div class="flex flex-col items-center gap-1">
          <button
              class="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 active:bg-red-800 shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] ring-2 ring-gray-700"/>
          <span class="text-[8px] text-gray-400 leading-none">Notruf</span>
        </div>
      </div>

      <!-- Spalte 2: Display + Kontexttasten -->
      <div class="w-[260px] flex flex-col items-center py-2 px-1 border-l border-r border-gray-700">
        <div class="h-[220px] w-[250px]">
          <Screen/>
        </div>
        <ContextButtons/>
      </div>

      <!-- Spalte 3: LEDs | Kreuz-Navigationspad | Zahlentastatur -->
      <div class="flex-1 flex flex-row items-center px-3 py-2 gap-3">

        <!-- LED-Indikatoren: zwei kleine Rechtecke, vertikal ausgerichtet mit dem Navigationskreuz -->
        <div class="self-stretch flex flex-col justify-evenly">
          <div class="w-4 h-4 rounded-full bg-gray-600" :class="led1Class"/>
          <div class="w-4 h-4 rounded-full bg-gray-600" :class="led2Class"/>
        </div>

        <!-- Navigationsbereich: feste Breite für w-full der Kind-Buttons -->
        <div class="w-[100px]">
          <NavigationButtons/>
        </div>

        <!-- Zahlentastatur: Zeile 1 fluchtet mit Grün-Mitte, Zeile 4 mit Man-Down-Mitte -->
        <div class="w-44 relative self-stretch flex items-center">
          <span class="absolute top-1.5 left-0 right-0 text-xs text-gray-400 text-center">{{ store.activeProfile.name }}</span>
          <Keypad/>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import Screen from '~/components/Screen.vue';
import ContextButtons from '~/components/ContextButtons.vue';
import NavigationButtons from '~/components/NavigationButtons.vue';
import Keypad from '~/components/Keypad.vue';
import NavigationKnob from '~/components/NavigationKnob.vue';
import {useDeviceStore} from '~/stores/useDeviceStore';

const store = useDeviceStore();

function getLedClass(color: string): string {
  switch (color) {
    case 'red':    return 'bg-red-500';
    case 'green':  return 'bg-green-500 animate-pulse';
    case 'blue':   return 'bg-blue-500';
    case 'yellow': return 'bg-yellow-500';
    default:       return 'bg-gray-600';
  }
}

const led1Class = computed(() => getLedClass(store.led1Color));
const led2Class = computed(() => getLedClass(store.led2Color));
</script>