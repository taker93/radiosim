<script lang="ts" setup>
import {useDeviceStore} from "~/stores/useDeviceStore";
import {useAppSettingsStore} from "~/stores/useAppSettingsStore";
import {lk24Profile} from "~/deviceProfiles/lk24";
import {scc3Profile} from "~/deviceProfiles/lkcc";

const device = useDeviceStore();
const settings = useAppSettingsStore();
const navigation = useNavigationStore();

const availableProfiles = [lk24Profile, scc3Profile];

const activeProfileId = computed<string>({
  get() { return device.activeProfile.id; },
  set(id) {
    const profile = availableProfiles.find(p => p.id === id);
    if (profile) device.setActiveProfile(profile);
  }
});

function updateTimeout(value: number) {
  settings.setModalTimeout(value);
}

function listenDebug(e: KeyboardEvent) {
  if (e.key === 'D') {
    settings.debug = !settings.debug;
  }
}

const hasManDownFeature = computed<boolean>({
  get() {
    return device.hasManDownFeature;
  },
  set(newValue) {
    device.hasManDownFeature = newValue;
    device.resetContextmenu();
  }
});
</script>

<template>
  <div class="p-4 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none" tabindex="0"
       @keyup.shift="listenDebug">
    <h3 class="font-bold text-xl mb-2">Konfigurationseinstellungen</h3>
    <div class="mb-4 space-y-2">
      <div>
        <label for="deviceProfile" class="block text-sm font-medium text-gray-700">Gerätetyp</label>
        <select id="deviceProfile" v-model="activeProfileId"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          <option v-for="p in availableProfiles" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
      </div>
      <div>
        <label for="callsign" class="block text-sm font-medium text-gray-700">Rufzeichen</label>
        <input
            id="callsign"
            type="text"
            v-model="settings.callsign"
            @input="settings.setCallsign(($event.target as HTMLInputElement).value)"
            placeholder="z.B. FL.DIZ.2/44-1 MLF"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label for="timeout" class="block text-sm font-medium text-gray-700">Gruppenwechsel Timeout (Sekunden)</label>
        <input
            id="timeout"
            type="number"
            min="1"
            v-model.number="settings.modalTimeout"
            @input="updateTimeout($event.target?.value)"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label for="hasManDownFeature" class="text-base font-medium text-gray-700 mr-2">Gerät mit
          Totmannschaltung:</label>
        <input id="hasManDownFeature" class="p-2 border border-gray-300 rounded-md" type="checkbox"
               v-model="hasManDownFeature"/>
      </div>

      <div>
        <button :class="device.manDownWarning ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'"
                class="text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                :disabled="!device.hasManDownFeature || !device.manDownActive"
                @click="device.toggleManDownWarning">
          {{ device.manDownWarning ? 'Totmann beenden' : 'Totmann auslösen' }}
        </button>
      </div>
    </div>

    <div v-if="settings.debug">
      <!-- Anzeige des aktuellen Geraetezustands -->
      <h4 class="font-bold text-base">Geräteinfos</h4>
      <div class="my-4 space-y-2">
        <div>
          <label for="isPoweredOff" class="text-base font-medium text-gray-700 mr-2">Ausgeschaltet:</label>
          <input id="isPoweredOff" class="p-2 border border-gray-300 rounded-md" type="checkbox"
                 v-model="device.isPoweredOff"/>
        </div>
        <div>
          <label for="isBooting" class="text-base font-medium text-gray-700 mr-2">Bootup:</label>
          <input id="isBooting" class="p-2 border border-gray-300 rounded-md" type="checkbox"
                 v-model="device.isBooting"/>
        </div>
        <div>
          <label for="hasSDS" class="text-base font-medium text-gray-700 mr-2">SDS:</label>
          <input id="hasSDS" class="p-2 border border-gray-300 rounded-md" type="checkbox"
                 v-model="device.hasSDS"/>
        </div>
      </div>

      <!-- Anzeige der aktuellen Aktion & Modals -->
      <h4 class="font-bold text-base">Aktionsinfos</h4>
      <div class="my-4">
        <label for="currentAction" class="text-sm font-medium text-gray-700">Aktuelle Aktion:</label>
        <input id="currentAction" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="device.currentAction || 'Keine Aktion aktiv'"/>
        <label for="activeModal" class="text-sm font-medium text-gray-700">Aktuelles Modal:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="device.activeModal || 'Kein Modal aktiv'"/>
      </div>

      <!-- Anzeige des aktuellen NavigationStore -->
      <h4 class="font-bold text-base">Navigationsinfos</h4>
      <div class="my-4">
        <label for="activeModal" class="text-sm font-medium text-gray-700">Path:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.path"/>

        <label for="activeModal" class="text-sm font-medium text-gray-700">Level:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.currentLevel"/>

        <label for="activeModal" class="text-sm font-medium text-gray-700">Gruppe:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.currentGroup?.name"/>

        <label for="activeModal" class="text-sm font-medium text-gray-700">Folder:</label>
        <input id="activeModal" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" disabled
               :value="navigation.currentFolder?.name"/>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Optionale zusätzliche Styles */
</style>