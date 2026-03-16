<template>
  <component :is="deviceRegistry[store.activeProfile.id]"/>
</template>

<script setup lang="ts">
import {useDeviceStore} from '~/stores/useDeviceStore';
import {deviceRegistry} from '~/deviceRegistry';

const store = useDeviceStore();
</script>
