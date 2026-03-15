<template>

  <div id="radio-device" class="flex flex-col my-4">
    <div class="relative">
      <!-- Drehknopf -->
      <NavigationKnob class="relative left-4 bottom-0"/>
      <!-- Antenna -->
      <div class="absolute right-4 bottom-0 h-14 lg:h-60 w-10 bg-gray-800 rounded-t-2xl overflow-hidden">
      </div>
    </div>
    <div class="bg-gray-800 min-w-72 w-72 max-w-72 rounded-xl text-white shadow-lg">
      <!-- LEDs Component -->
      <LEDs/>

      <div class="flex flex-col items-center pb-4">
        <!-- Screen Section -->
        <Screen/>

        <!-- Context Buttons -->
        <ContextButtons/>

        <!-- Navigation and Side Buttons -->
        <NavigationButtons/>

        <!-- Keypad Section -->
        <Keypad/>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import LEDs from './LEDs.vue';
import Screen from './Screen.vue';
import ContextButtons from './ContextButtons.vue';
import NavigationButtons from './NavigationButtons.vue';
import Keypad from './Keypad.vue';
import NavigationKnob from "~/components/NavigationKnob.vue";
</script>