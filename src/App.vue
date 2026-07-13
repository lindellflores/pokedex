<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="transitionBackground">
    <RouterView v-slot="{ Component }">
      <Transition name="fade-black">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style>
.transitionBackground {
  width: 100vw;
  min-height: 100vh;
  background: black;
  overflow: hidden;
}

.fade-black-enter-active,
.fade-black-leave-active {
  transition: opacity 0.45s ease;
}

.fade-black-enter-from,
.fade-black-leave-to {
  opacity: 0;
}

.fade-black-enter-to,
.fade-black-leave-from {
  opacity: 1;
}
</style>
