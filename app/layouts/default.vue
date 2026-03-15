<script setup lang="ts">
import AppHeader from "~/components/AppHeader.vue";
import AppFooter from "~/components/AppFooter.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <AppHeader/>

    <!-- Page -->
    <slot/>

    <!-- Footer -->
    <AppFooter/>
  </div>
</template>