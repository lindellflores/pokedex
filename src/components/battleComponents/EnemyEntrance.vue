<script setup lang="ts">
import rayquaza from "@/assets/battle/rayquaza.png";
</script>

<template>
  <img :src="rayquaza" class="enemyPokemon" />
</template>

<style scoped>
.enemyPokemon {
  position: absolute;

  width: 320px;

  top: 30px;
  left: -250px;

  image-rendering: pixelated;

  animation: enemySlide 2s ease-out forwards;

  z-index: 8;
}

@keyframes enemySlide {
  0% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(1200px);
  }

  100% {
    transform: translateX(1100px);
  }
}
</style>
