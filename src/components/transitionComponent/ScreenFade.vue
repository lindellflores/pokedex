<script setup lang="ts">
defineProps<{
  show: boolean;
}>();
</script>

<template>
  <Transition name="screen-fade">
    <div
      v-if="show"
      class="overlay"
    />
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;

  background: black;

  z-index: 999999;

  pointer-events: none;
}

.screen-fade-enter-active,
.screen-fade-leave-active {
  transition: opacity .45s linear;
}

.screen-fade-enter-from,
.screen-fade-leave-to {
  opacity: 0;
}

.screen-fade-enter-to,
.screen-fade-leave-from {
  opacity: 1;
}
</style>