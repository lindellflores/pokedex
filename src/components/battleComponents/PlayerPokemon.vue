<script setup lang="ts">
import sceptile from "@/assets/battle/sceptile.png";
</script>

<template>
  <img :src="sceptile" class="playerPokemon" />
</template>

<style scoped>
.playerPokemon {
  position: absolute;

  bottom: 150px;
  right: 800px;

  width: 360px;

  image-rendering: pixelated;

  opacity: 0;

  transform-origin: bottom center;

  animation: playerAppear 0.45s ease-out forwards;
}

@keyframes playerAppear {
  0% {
    opacity: 0;
    transform: translateY(70px) scale(0.4);
  }

  20% {
    opacity: 1;
    transform: translateY(-8px) scale(1.05);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
