<script setup lang="ts">
import background from "@/assets/battle/battlebackground.png";
</script>

<template>
  <div class="background" :style="{ backgroundImage: `url(${background})` }" />
</template>

<style scoped>
.background {
  position: absolute;
  inset: 0;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  image-rendering: pixelated;

  z-index: 0;
}
</style>
