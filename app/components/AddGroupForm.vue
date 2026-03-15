<script setup lang="ts">
import {useNavigationStore} from '~/stores/useNavigationStore';
import {Mode} from '~/types/interfaces';
import type {Group} from '~/types/interfaces';

const props = defineProps<{
  editGroup?: { group: Group; folderId: number } | null;
}>();

const emit = defineEmits<{
  (e: 'saved'): void;
  (e: 'cancelEdit'): void;
}>();

const navStore = useNavigationStore();

const selectedFolderId = ref<number | null>(null);
const groupName = ref('');
const groupNumber = ref<number | null>(null);
const groupMode = ref<Mode>(Mode.TMO);
const success = ref(false);
const originalGroupName = ref('');

const isEditMode = computed(() => !!props.editGroup);

const isValid = computed(
    () => selectedFolderId.value !== null && groupName.value.trim() !== '' && groupNumber.value !== null
);

watch(() => props.editGroup, (val) => {
  if (val) {
    selectedFolderId.value = val.folderId;
    groupName.value = val.group.name;
    groupNumber.value = val.group.number;
    groupMode.value = val.group.mode;
    originalGroupName.value = val.group.name;
  } else {
    resetForm();
  }
}, { immediate: true });

function resetForm() {
  selectedFolderId.value = null;
  groupName.value = '';
  groupNumber.value = null;
  groupMode.value = Mode.TMO;
  originalGroupName.value = '';
}

function submit() {
  if (!isValid.value) return;

  const group: Group = {
    name: groupName.value.trim(),
    number: groupNumber.value!,
    mode: groupMode.value,
  };

  if (isEditMode.value && props.editGroup) {
    navStore.updateGroup(props.editGroup.folderId, originalGroupName.value, selectedFolderId.value!, group);
    success.value = true;
    setTimeout(() => success.value = false, 2500);
    emit('saved');
  } else {
    navStore.addGroup(selectedFolderId.value!, group);
    resetForm();
    success.value = true;
    setTimeout(() => success.value = false, 2500);
  }
}

function cancel() {
  resetForm();
  emit('cancelEdit');
}
</script>

<template>
  <div class="space-y-3">
    <h3 class="font-bold text-base">{{ isEditMode ? 'Gruppe bearbeiten' : 'Neue Gruppe hinzufügen' }}</h3>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Ordner</label>
      <select
          v-model="selectedFolderId"
          class="w-full p-2 border border-gray-300 rounded-md text-sm">
        <option :value="null" disabled>Ordner wählen…</option>
        <option v-for="f in navStore.allFolders" :key="f.id" :value="f.id">{{ f.label }}</option>
      </select>
    </div>

    <div class="flex gap-3">
      <div class="flex-1">
        <label class="block text-sm font-medium text-gray-700 mb-1">Gruppenname</label>
        <input
            v-model="groupName"
            type="text"
            placeholder="z. B. RP DIEZ F4"
            class="w-full p-2 border border-gray-300 rounded-md text-sm"/>
      </div>
      <div class="w-28">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nummer</label>
        <input
            v-model.number="groupNumber"
            type="number"
            min="0"
            placeholder="z. B. 2508"
            class="w-full p-2 border border-gray-300 rounded-md text-sm"/>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Modus</label>
      <div class="flex gap-4 text-sm">
        <label class="flex items-center gap-1.5 cursor-pointer">
          <input v-model="groupMode" type="radio" :value="Mode.TMO"/> TMO
        </label>
        <label class="flex items-center gap-1.5 cursor-pointer">
          <input v-model="groupMode" type="radio" :value="Mode.DMO"/> DMO
        </label>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
          type="button"
          :disabled="!isValid"
          @click="submit"
          class="py-2 px-4 text-sm font-medium text-white bg-emerald-700 rounded-lg border border-transparent hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 disabled:opacity-40 disabled:cursor-not-allowed">
        {{ isEditMode ? 'Speichern' : 'Hinzufügen' }}
      </button>
      <button
          v-if="isEditMode"
          type="button"
          @click="cancel"
          class="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100">
        Abbrechen
      </button>
      <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity duration-300"
                  leave-to-class="opacity-0" leave-active-class="transition-opacity duration-500">
        <span v-if="success" class="text-sm text-emerald-700 font-medium">Gruppe gespeichert.</span>
      </Transition>
    </div>
  </div>
</template>
