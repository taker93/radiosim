<script setup lang="ts">
import TreeNode from './TreeNode.vue';
import {type Folder, type Group, type Root} from "~/types/interfaces";

const props = defineProps<{ folder: Root; selectedGroupName?: string }>();
const emit = defineEmits<{
  (e: 'selectGroup', group: Group, folder: Folder): void;
}>();

const root = ref<Root>(props.folder);

// Funktion zum Entfernen des Elements aus dem Tree
function removeItem(folders: Folder[], itemName: string): Group | Folder | null {
  // Überprüfen, ob das Item selbst ein Ordner auf Root-Level ist
  const index = folders.findIndex(folder => folder.name === itemName);
  // Wenn der Index gefunden wurde, null returnen, da das Verschieben auf Root-Level nicht erlaubt ist
  if (index !== -1) {
    console.warn("Löschen von Root-Level-Elementen nicht erlaubt");
    return null;
  }

  for (const folder of folders) {
    // Überprüfen, ob das Item eine Gruppe ist und in diesem Ordner existiert
    const groupIndex = folder.groups?.findIndex((g) => g.name === itemName);
    if (groupIndex !== undefined && groupIndex !== -1) {
      return folder.groups?.splice(groupIndex, 1)[0] || null;
    }

    // Falls das Item ein Unterordner ist
    const folderIndex = folder.subFolders?.findIndex((f) => f.name === itemName);
    if (folderIndex !== undefined && folderIndex !== -1) {
      return folder.subFolders?.splice(folderIndex, 1)[0] || null;
    }

    // Rekursion in Unterordnern
    if (folder.subFolders) {
      const removedItem = removeItem(folder.subFolders, itemName);
      if (removedItem) {
        return removedItem;
      }
    }
  }
  return null;
}

// Funktion zum Behandeln der Bewegung eines Elements im Tree
function moveItem(item: Group | Folder, targetFolder: Folder) {
  console.log("Moving", item.name, "to", targetFolder.name);

  if (item.name === targetFolder.name) {
    console.warn("Elemente können nicht in sich selbst verschoben werden!");
    return;
  }

  // Entferne das Element an der alten Position
  const removedItem = removeItem(root.value.folders, item.name);
  if (!removedItem) {
    return;
  }

  const draggedItem = item;

  if (!draggedItem) {
    console.warn('Das Element wurde nicht gefunden und konnte nicht verschoben werden.');
    return;
  }

  // Validierungsregel: targetFolderName darf nicht null sein
  if (!targetFolder.name) {
    console.warn('Ziel darf nicht null sein');
    return;
  }

  // Validierungsregel: Gruppen können nicht in die Root-Ebene verschoben werden
  if ('number' in item && targetFolder.name === null) {
    console.warn('Gruppen können nicht in die Root-Ebene verschoben werden.');
    return;
  }

  addItemToTarget(root.value.folders, targetFolder.name, draggedItem);
}

// Hinzufügen des Elements im Tree
function addItemToTarget(folders: Folder[], targetFolderName: string | null, item: Group | Folder) {
  // Falls das Ziel die Root-Ebene ist und das Element ein Ordner ist
  if (targetFolderName === null && !('number' in item)) {
    folders.push(item as Folder);
    return;
  }

  for (const folder of folders) {
    if (folder.name === targetFolderName) {
      // Wenn das Ziel ein Ordner ist, das Element entsprechend der Typen hinzufügen
      if ('number' in item) {
        folder.groups = folder.groups || [];
        folder.groups.push(item as Group);

        // sort by name
        folder.groups.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      } else {
        folder.subFolders = folder.subFolders || [];
        folder.subFolders.push(item as Folder);

        // sort by name
        folder.subFolders.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
      }
      return;
    }

    // Rekursion in Unterordnern
    if (folder.subFolders) {
      addItemToTarget(folder.subFolders, targetFolderName, item);
    }
  }
}
</script>

<template>
  <div>
    <TreeNode
        v-for="folder in root.folders"
        :key="folder.name"
        :folder="folder"
        :root="true"
        :selectedGroupName="selectedGroupName"
        @moveItem="moveItem"
        @selectGroup="(group, folder) => emit('selectGroup', group, folder)"
    />
  </div>
</template>

<style scoped>
</style>
