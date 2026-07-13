<script setup lang="ts">
import grass from "@/assets/battle/grass.png";
</script>

<template>
  <div class="grassContainer">
    <img :src="grass" class="grass" />
    <img :src="grass" class="grass" />
    <img :src="grass" class="grass" />
    <img :src="grass" class="grass" />
  </div>
</template>

<style scoped>
.grassContainer {
  position: absolute;
  top: 25rem;
  right: -2400px; /* 3 × 800px */

  display: flex;
  gap: 0;

  animation: grassSweep 2s ease-out forwards;

  z-index: 5;
}

.grass {
  width: 800px;
  flex-shrink: 0;
  image-rendering: pixelated;
}

@keyframes grassSweep {
  0% {
    transform: translate(0, 0);
  }

  85% {
    transform: translate(calc(-100vw - 550px), 0);
  }

  100% {
    transform: translate(calc(-100vw - 600px), 250px);
  }
}
</style>
