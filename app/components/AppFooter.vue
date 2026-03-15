<script setup lang="ts">

</script>

<template>
  <div class="border-t border-gray-300">
    <div
        class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 flex flex-col items-center gap-y-2 lg:flex-row lg:items-center lg:justify-between lg:gap-x-3">
      <!-- Social Media -->
      <div class="lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3">
        <a class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 p-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 inline-flex items-center"
           aria-label="FunkSim on GitHub" href="https://github.com/taker93/radiosim" rel="noopener noreferrer"
           target="_blank">
          <Icon class="flex-shrink-0 h-5 w-5" name="i-simple-icons:github"/>
        </a>
      </div>
      <div class="lg:flex-1 flex items-center justify-center lg:order-2">
        <p class="text-gray-500 text-sm">
          Maintained by <a href="https://nur-kurz.de/" rel="noopener noreferrer" target="_blank"
                           class="underline">Lucas Kurz</a>
        </p>
      </div>
      <!-- Copyright -->
      <div class="lg:flex-1 flex items-center justify-center lg:justify-start lg:order-1">
        <p class="text-gray-500 text-sm">Copyright © 2024 FunkSim - <a
            href="https://github.com/taker93/radiosim/blob/main/LICENSE" rel="noopener noreferrer" target="_blank"
            class="hover:underline">MIT License</a></p>
      </div>
    </div>
  </div>
</template>