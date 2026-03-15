<script lang="ts" setup>
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useNavigationStore} from '@/stores/useNavigationStore';

const navStore = useNavigationStore();
const store = useDeviceStore();

function handleGreenButtonClick() {
  switch (store.currentAction) {
    case '':
      break;
    default:
      break;
  }
}

function handleRedButtonClick() {
  switch (store.currentAction) {
    case '':
      break;
    default:
      break;
  }
}

function handleLongRedButtonClick() {
  switch (store.currentAction) {
    case '':
      // Boot logic
      if (store.isPoweredOff) {
        store.powerOn();
        break;
      }

      // Power off logic
      if (!store.isPoweredOff && !store.isBooting) {
        store.powerOff();
        break;
      }

      break;
    default:
      break;
  }
}

function handleNavigationButtonClick(direction: string) {
  // Aktion basierend auf dem Zustand des Stores ausführen
  switch (store.currentAction) {
    case 'selectGroup':
      handleGroupSelection(direction);
      break;
      // Weitere Aktionen je nach Modal oder Ansicht hinzufügen
    default:
      console.log(`Keine definierte Aktion für ${direction}`);
  }
}

function handleGroupSelection(direction: string) {
  console.log(`Handle ${direction}`);
  switch (direction) {
    case 'up':
      navStore.navigateUp(); // Gehe zum übergeordneten Ordner, falls vorhanden
      break;
    case 'down':
      navStore.navigateDown(); // Wechsle eine Ebene nach unten
      break;
    case 'left':
      navStore.navigateVertical('left'); // Wechsle zum vorherigen Ordner auf derselben Ebene
      break;
    case 'right':
      navStore.navigateVertical('right'); // Wechsle zum nächsten Ordner auf derselben Ebene
      break;
    default:
      console.log(`Unbekannte Richtung: ${direction}`);
  }
}
</script>

<template>
  <div class="w-full flex justify-evenly items-center">
    <!-- Green Call Button -->
    <button
        class="w-6 h-20 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 text-white rounded-md flex items-center justify-center text-lg mr-2"
        @click="handleGreenButtonClick()">
      <Icon class="text-green-600" name="material-symbols:call"/>
    </button>

    <!-- Circle Menu -->
    <div class="circle-menu">
      <button
          class="menu-item item-1 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
          @click="handleNavigationButtonClick('up')"><span>▲</span></button>
      <button
          class="menu-item item-2 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
          @click="handleNavigationButtonClick('right')"><span>▲</span></button>
      <button
          class="menu-item item-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
          @click="handleNavigationButtonClick('down')"><span>▲</span></button>
      <button
          class="menu-item item-4 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
          @click="handleNavigationButtonClick('left')"><span>▲</span></button>
    </div>

    <!-- Red Cancel Button -->
    <button
        class="w-6 h-20 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 text-white rounded-md flex items-center justify-center text-lg ml-2"
        v-use-longpress @longpress="handleLongRedButtonClick" @click="handleRedButtonClick()">
      <span class="flex flex-col h-full py-1 justify-between items-center">
        <Icon size="0.7rem" class="text-white" name="material-symbols:other-houses"/>
        <Icon class="text-red-600" name="material-symbols:phone-disabled-rounded"/>
        <Icon size="0.7rem" class="text-white" name="material-symbols:power-settings-new"/>
      </span>
    </button>
  </div>
</template>

<style scoped>
.circle-menu {
  position: relative;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;
}

.menu-item {
  position: absolute;
  width: 2.3rem;
  height: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem 0.8rem 0 0.8rem; /* Only round outer edges */
}

.item-1 {
  top: 8%;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

.item-2 {
  top: 50%;
  left: 95%;
  transform: translateY(-50%) translateX(-100%) rotate(135deg);
}

.item-3 {
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%) rotate(-135deg);
}

.item-4 {
  top: 50%;
  left: 5%;
  transform: translateY(-50%) rotate(-45deg);
}

.menu-item span {
  font-size: 7pt;
  transform: rotate(-45deg);
}
</style>
