<template>
  <div class="">
    <!-- Ordner-Drop-Zone -->
    <div
        :class="[
        'p-2 my-1 bg-white border-gray-300 border rounded pointer-events-auto hover:bg-gray-200 active:bg-gray-200 select-none',
        { 'border-blue-500 bg-blue-100': isDragOverFolder, 'cursor-move': !root },
        { '!border-green-500 !bg-green-100': isDragOverFolder },
      ]"
        :draggable="!root"
        @click.stop="isOpen = !isOpen"
        @dragstart="onDragStart($event, folder)"
        @dragover="onDragOverFolder($event, folder)"
        @dragenter="onDragEnterFolder"
        @dragleave="onDragLeaveFolder"
        @drop="onDrop($event, folder)"
    >
      <Icon v-if="!root" name="material-symbols:drag-indicator" class="pointer-events-auto"/>
      <Icon
          v-if="hasChildren"
          :name="isOpen ? 'material-symbols:expand-more' : 'material-symbols:chevron-right'"
          class="pointer-events-none"
      />
      📂 {{ folder.name }}
    </div>

    <template v-if="isOpen">
      <!-- Gruppen-Drop-Zonen -->
      <div
          v-for="group in folder.groups"
          :key="group.name"
          class="ml-4"
          :class="[
          'p-2 my-1 border cursor-pointer rounded hover:bg-blue-200 active:bg-blue-200',
          group.name === selectedGroupName
            ? 'border-blue-500 bg-blue-200 ring-2 ring-blue-400'
            : 'bg-blue-100 border-gray-300',
        ]"
          :draggable="true"
          @click.stop="emit('selectGroup', group, folder)"
          @dragstart="onDragStart($event, group)"
          @dragover="onDragOverGroup($event)"
          @dragenter="onDragEnterGroup"
          @dragleave="onDragLeaveGroup"
          @drop="onDrop($event, folder)"
      >
        <Icon name="material-symbols:drag-indicator"/>
        <span class="font-medium">{{ group.name }}</span>
        <span class="ml-2 text-xs text-gray-500 font-mono">{{ group.number }}</span>
        <span
            class="ml-2 text-xs px-1.5 py-0.5 rounded font-medium"
            :class="group.mode === 'TMO' ? 'bg-gray-200 text-gray-600' : 'bg-blue-200 text-blue-700'"
        >{{ group.mode }}</span>
      </div>

      <!-- Rekursive Darstellung von Unterordnern -->
      <div v-if="folder.subFolders">
        <TreeNode
            v-for="subFolder in folder.subFolders"
            :key="subFolder.name"
            class="ml-4"
            :folder="subFolder"
            :root="false"
            :selectedGroupName="selectedGroupName"
            @moveItem="handleMoveItem"
            @selectGroup="(group, f) => emit('selectGroup', group, f)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type {Folder, Group} from '~/types/interfaces';

const props = defineProps<{ folder: Folder; root: boolean; selectedGroupName?: string }>();
const emit = defineEmits<{
  (e: 'moveItem', item: Group | Folder, targetFolder: Folder): void;
  (e: 'selectGroup', group: Group, folder: Folder): void;
}>();

const isOpen = ref(false);
const hasChildren = computed(() => (props.folder.groups?.length ?? 0) > 0 || (props.folder.subFolders?.length ?? 0) > 0);

const isDragOverFolder = ref(false);
const isDragOverGroup = ref(false);

function onDragStart(event: DragEvent, item: Group | Folder) {
  event.dataTransfer?.setData('application/json', JSON.stringify(item));
}

function onDragOverGroup(event: DragEvent) {
  event.preventDefault();
}

function onDragOverFolder(event: DragEvent, item: Folder) {
  event.preventDefault();
}

function onDrop(event: DragEvent, targetFolder: Folder) {
  const data = event.dataTransfer?.getData('application/json');
  if (data) {
    const item = JSON.parse(data) as Group | Folder;
    emit('moveItem', item, targetFolder);
  }
  isDragOverFolder.value = false;
  isDragOverGroup.value = false;
}

function handleMoveItem(item: Group | Folder, subFolder: Folder) {
  emit('moveItem', item, subFolder);
}

function onDragEnterFolder() {
  isDragOverFolder.value = true;
}

function onDragLeaveFolder() {
  isDragOverFolder.value = false;
}

function onDragEnterGroup() {
  isDragOverGroup.value = true;
}

function onDragLeaveGroup() {
  isDragOverGroup.value = false;
}
</script>

<style scoped>
/* Kein zusätzliches Styling notwendig */
</style>
