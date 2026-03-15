<script setup lang="ts">
import {useNavigationStore} from "~/stores/useNavigationStore";
import type {Folder, Group} from "~/types/interfaces";

const navStore = useNavigationStore();
const fileInput = ref<HTMLInputElement | null>(null);

const editingGroup = ref<{ group: Group; folderId: number } | null>(null);

function onSelectGroup(group: Group, folder: Folder) {
  editingGroup.value = { group, folderId: folder.id };
}

function onSaved() {
  editingGroup.value = null;
}

function onCancelEdit() {
  editingGroup.value = null;
}

function downloadFolderData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(navStore.folderData, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "folderData.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function triggerFileInput() {
  fileInput.value?.click();
}

function uploadFolderData(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const result = e.target?.result;
      if (typeof result === 'string') {
        const parsedData = JSON.parse(result);
        navStore.importFolderData(parsedData);
        alert('Folder data successfully imported!');
        fileInput.value!.value = "";
      }
    } catch (error) {
      alert('Failed to import folder data. Please make sure the file is valid JSON.');
      fileInput.value!.value = "";
    }
  };
  reader.readAsText(file);
}
</script>

<template>
  <div class="flex flex-1 grow items-start space-x-16 justify-center bg-gray-200 py-12">
    <TreeView
        :folder="navStore.folderData"
        :selectedGroupName="editingGroup?.group.name"
        class="p-4 bg-white rounded w-72 shrink-0"
        @selectGroup="onSelectGroup"
    />
    <div class="flex flex-col w-full max-w-screen-md bg-white rounded">
      <div class="border-y">
        <div class="p-4 space-y-4">
          <h2 class="text-xl font-bold">Gruppenkonfiguration</h2>
          <p>Deine Konfiguration wird automatisch im Browser gespeichert und bleibt auch nach einem Seitenreload erhalten.</p>
          <p>Über <span class="font-bold italic">"Export"</span> kannst du die aktuelle Konfiguration als JSON-Datei herunterladen und bearbeiten.
            Über <span class="font-bold italic text-blue-700">"Import"</span> lässt sich eine bearbeitete Datei wieder einlesen.
            Achte dabei auf die korrekte JSON-Syntax.</p>
          <p class="text-sm text-gray-500">Klicke auf eine Gruppe in der linken Übersicht, um sie zu bearbeiten.</p>

          <div v-if="editingGroup" class="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
            <Icon name="material-symbols:edit" class="shrink-0"/>
            <span>Bearbeite: <strong>{{ editingGroup.group.name }}</strong></span>
          </div>

          <hr class="border-gray-200"/>
          <AddGroupForm
              :editGroup="editingGroup"
              @saved="onSaved"
              @cancelEdit="onCancelEdit"
          />
        </div>
      </div>
      <div class="space-x-1 p-4">
        <!-- Importfunktion -->
        <button
            class="py-2.5 px-5 me-2 text-sm font-medium text-white focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-blue-800 focus:z-10 focus:ring-4 focus:ring-gray-100"
            type="button"
            @click="triggerFileInput">
          Import
        </button>
        <input type="file" ref="fileInput" @change="uploadFolderData" class="hidden" accept=".json"/>

        <!-- Exportfunktion -->
        <button
            class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            type="button"
            @click="downloadFolderData">
          Export
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
[type=file] {
  background: unset;
  border-color: inherit;
  border-radius: 0;
  border-width: 0;
  font-size: unset;
  line-height: inherit;
  padding: 0;
}
</style>
