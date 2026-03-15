<script setup lang="ts">
</script>

<template>

  <div
      class="flex flex-col lg:flex-row flex-1 items-center lg:space-x-16 justify-center bg-gray-200">
    <!-- Funkgeraet -->
    <RadioDevice/>

    <div class="space-y-4 mb-4 max-w-xs lg:max-w-screen-sm">
      <!-- Welcome Message -->
      <div class="p-4 bg-white border border-gray-300 rounded-md shadow-md">
        <h1 class="text-2xl font-bold mb-2">Willkommen bei Funk<span class="text-blue-800">Sim</span></h1>
        <p>
          Eine einfache Simulation eines BOS-Funkgeräts zum Trainieren und Üben der Bedienung.
        </p>
        <p>
          Um zu Starten klicke eine Sekunde lang auf die Taste
          <span class="inline p-1 m-1 border border-gray-200 w-8 h-8 bg-gray-600 rounded">
             <Icon class="text-red-600" name="material-symbols:phone-disabled-rounded"/>
          </span>.
          Im Anschluss daran wird das Gerät hochfahren.
        </p>
        <p class="mt-4">
          Bei Ideen und Fragen zur Anwendung kannst du dich an <a href="mailto:lucas@nur-kurz.de"
                                                                  class="underline">per Mail</a> an uns wenden.
        </p>
      </div>

      <!-- Konfigurationskomponente -->
      <div class="hidden lg:block">
        <ConfigurationSettings/>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Optionale globale Styles */
</style>