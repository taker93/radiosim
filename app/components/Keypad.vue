<script lang="ts" setup>
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useNavigationStore} from "~/stores/useNavigationStore";

const store = useDeviceStore();
const navStore = useNavigationStore();

function handleStarButtonClick() {
  if (store.currentAction === '') {
    console.log('Toggle LockModeModal')
    store.toggleModal('LockModeModal');
  }
}

function handleNumberButtonClick(num: number) {
  if (store.currentAction === 'selectGroup') {
    navStore.navigateByNumber(num)
  }
}
</script>

<template>
  <div class="px-2 w-full grid grid-cols-3 gap-2 font-bold">
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(1)">
      1<span
        class="ml-1 font-thin text-xs">-</span></button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(2)">
      2<span
        class="ml-1 font-thin text-xs">abc</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(3)">
      3<span
        class="ml-1 font-thin text-xs">def</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(4)">
      4<span
        class="ml-1 font-thin text-xs">ghi</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(5)">
      5<span
        class="ml-1 font-thin text-xs">jkl</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(6)">
      6<span
        class="ml-1 font-thin text-xs">mno</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(7)">
      7<span
        class="ml-1 font-thin text-xs">pqrs</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(8)">
      8<span
        class="ml-1 font-thin text-xs">tuv</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(9)">
      9<span
        class="ml-1 font-thin text-xs">wxyz</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleStarButtonClick">*
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center"
        @click="handleNumberButtonClick(0)">
      0<span
        class="ml-1 font-thin text-xs">.,;</span>
    </button>
    <button
        class="h-6 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 rounded-md flex items-center justify-center">
      #
    </button>
  </div>
</template>

<style scoped>
/* Hier kannst du spezifische Styles hinzufügen, falls erforderlich */
</style>
