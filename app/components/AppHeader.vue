<script setup lang="ts">

</script>

<template>
  <div class="relative z-10 border-b border-gray-300 bg-white">
    <div
        class="mx-auto px-4 sm:px-6 lg:px-8 max-w-full py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
      <NuxtLink class="text-3xl hover:opacity-60 transition-opacity" to="/">
        Funk<span class="text-blue-800">Sim</span>
      </NuxtLink>
      <ul class="items-center gap-x-8 hidden lg:flex">
        <li>
          <NuxtLink to="/" class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary">
            Funkgerät
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/groups" class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary">
            Gruppenmatrix
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>