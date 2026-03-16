<script lang="ts" setup>
import {useDeviceStore} from '@/stores/useDeviceStore';
import {useNavigationStore} from '@/stores/useNavigationStore';

const navStore = useNavigationStore();
const store = useDeviceStore();

const layout = computed(() => store.activeProfile.styles.navigationButtons.layout);

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
      if (store.isPoweredOff) {
        store.powerOn();
        break;
      }
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
  switch (store.currentAction) {
    case 'selectGroup':
      handleGroupSelection(direction);
      break;
    default:
      console.log(`Keine definierte Aktion für ${direction}`);
  }
}

function handleGroupSelection(direction: string) {
  switch (direction) {
    case 'up':    navStore.navigateUp(); break;
    case 'down':  navStore.navigateDown(); break;
    case 'left':  navStore.navigateVertical('left'); break;
    case 'right': navStore.navigateVertical('right'); break;
  }
}
</script>

<template>
  <!-- Kreismenü: horizontale oder vertikale Anordnung -->
  <div :class="layout === 'vertical' ? 'flex flex-col items-center gap-1' : 'w-full flex justify-evenly items-center'">
      <button
          :class="layout === 'vertical' ? 'w-16 h-7' : 'w-6 h-20 mr-2'"
          class="bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 text-white rounded-md flex items-center justify-center text-lg"
          @click="handleGreenButtonClick()">
        <Icon class="text-green-600" name="material-symbols:call"/>
      </button>

      <div class="circle-menu">
        <button class="menu-item item-1 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
                @click="handleNavigationButtonClick('up')"><span>▲</span></button>
        <button class="menu-item item-2 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
                @click="handleNavigationButtonClick('right')"><span>▲</span></button>
        <button class="menu-item item-3 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
                @click="handleNavigationButtonClick('down')"><span>▲</span></button>
        <button class="menu-item item-4 bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 flex items-center justify-center text-white font-bold"
                @click="handleNavigationButtonClick('left')"><span>▲</span></button>
      </div>

      <button
          :class="layout === 'vertical' ? 'w-16 h-7 ml-0' : 'w-6 h-20 ml-2'"
          class="bg-gray-600 hover:bg-gray-700 active:ring-2 active:ring-inset active:ring-gray-600 text-white rounded-md flex items-center justify-center text-lg"
          v-use-longpress @longpress="handleLongRedButtonClick" @click="handleRedButtonClick()">
        <span :class="layout === 'vertical' ? 'flex flex-row gap-1 items-center' : 'flex flex-col h-full py-1 justify-between items-center'">
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
  border-radius: 0.8rem 0.8rem 0 0.8rem;
}

.item-1 { top: 8%; left: 50%; transform: translateX(-50%) rotate(45deg); }
.item-2 { top: 50%; left: 95%; transform: translateY(-50%) translateX(-100%) rotate(135deg); }
.item-3 { bottom: 8%; left: 50%; transform: translateX(-50%) rotate(-135deg); }
.item-4 { top: 50%; left: 5%; transform: translateY(-50%) rotate(-45deg); }

.menu-item span {
  font-size: 7pt;
  transform: rotate(-45deg);
}
</style>