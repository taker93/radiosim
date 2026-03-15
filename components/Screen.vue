<script setup lang="ts">
import {useDeviceStore} from '@/stores/useDeviceStore';
import CheckmarkModal from "~/components/CheckmarkModal.vue";
import BootScreen from "~/components/BootScreen.vue";

const store = useDeviceStore();
</script>

<template>
  <div class="h-full w-full bg-black rounded-md p-2 flex flex-col text-xs no-select">
    <div class="font-bold text-center mb-1">LK24</div>

    <div v-if="!store.isPoweredOff" class="flex min-h-80 max-h-80">
      <BootScreen v-if="store.isBooting"/>
      <div v-else class="flex flex-col w-full">
        <!-- Context Hints -->
        <div class="flex justify-between items-center h-4 py-3 space-x-1 bg-gray-800 text-lg">
          <div class="space-x-1">
            <Icon name="material-symbols:shield"/>
            <Icon v-if="store.locked" name="material-symbols:key" class="text-amber-400"/>
            <Icon name="material-symbols:person"/>
            <Icon v-if="store.hasSDS" name="material-symbols:mail-rounded" class="text-amber-400"/>
            <Icon v-if="store.manDownActive" name="material-symbols:detection-and-zone" class="text-amber-400"/>
          </div>
          <div class="space-x-1">
            <Icon name="material-symbols:battery-horiz-075-rounded" class="text-green-400"/>
            <Icon name="bi:reception-4"/>
          </div>
        </div>

        <!-- Main Screen -->
        <div class="relative flex flex-col flex-1 bg-gray-200">

          <!-- Overlay Modal -->
          <div class="absolute inset-8 flex items-center justify-center z-20" v-if="store.isModalOpen">
            <!-- Modal Inhalt -->
            <template v-if="store.activeModal === 'GroupSelectionModal'">
              <GroupSelectionModal/>
            </template>
            <template v-else-if="store.activeModal === 'LockModeModal'">
              <LockModeModal/>
            </template>
            <ManDownModal v-else-if="store.activeModal === 'ManDownModal'"/>
            <ManDownWarningModal v-else-if="store.activeModal === 'ManDownWarningModal'"/>
          </div>

          <!-- Checkmark Modal -->
          <div class="absolute inset-8 flex items-center justify-center z-10" v-if="store.showCheckmark">
            <CheckmarkModal/>
          </div>

          <!-- Fail Modal -->
          <div class="absolute inset-8 flex items-center justify-center z-10" v-if="store.showFail">
            <FailModal/>
          </div>

          <!-- Home Screen -->
          <div v-if="store.isGroupSelected" class="flex flex-col flex-1 py-1 px-2 space-y-1 relative z-0 text-blue-500">
            <p class="text-base tracking-widest">{{ store.status }}</p>
            <div class="text-right text-3xl">
              <p>{{ store.time }}<br>{{ store.date }}</p>
            </div>
            <div class="text-2xl">
              <p class="pl-4 border-y border-gray-300 text-blue-800">{{ store.group?.name }}</p>
              <p class="pl-4 text-red-600">Nr. {{ store.group?.number }}</p>
              <p class="pl-4">{{ store.folder?.name }}</p>
            </div>
          </div>
          <div v-else class="flex flex-col flex-1 py-1 px-2 space-y-1 relative z-0 text-blue-500">
            <p class="text-base tracking-widest">Gruppe wählen</p>
            <div class="text-right text-3xl">
              <p>{{ store.time }}<br>{{ store.date }}</p>
            </div>
            <div class="h-full">
              <div class="text-xl p-2 m-2 border-2 border-blue-500">
                <p class="text-blue-800 font-bold">Keine Gruppe gewählt</p>
                <p class="text-black font-semibold">Bitte Gruppe wählen</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Context Hints -->
        <div class="grid grid-cols-3 gap-0.5 text-[10px] text-center bg-gray-200">
          <div v-if="store.getContexts.left" class="bg-blue-800 px-2">{{ store.getContexts.left }}</div>
          <div v-else></div>

          <div v-if="store.getContexts.middle" class="bg-blue-800 px-2">{{ store.getContexts.middle }}</div>
          <div v-else></div>

          <div v-if="store.getContexts.right" class="bg-blue-800 px-2">{{ store.getContexts.right }}</div>
          <div v-else></div>
        </div>
      </div>
    </div>
    <div v-if="store.isPoweredOff" class="flex min-h-80 max-h-80 bg-gray-900">

    </div>

  </div>
</template>

<style scoped>
/* Hier kannst du spezifische Styles hinzufügen, falls erforderlich */
.no-select {
  user-select: none; /* unsupported on iOS, no workaround */
}
</style>
