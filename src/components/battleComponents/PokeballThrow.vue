<script setup lang="ts">
import pokeball from "@/assets/battle/pokeball.png";
</script>

<template>
  <img :src="pokeball" class="pokeball" />
</template>

<style scoped>
.pokeball {
  position: absolute;

  width: 70px;

  left: 420px;
  bottom: 240px;

  image-rendering: pixelated;

  z-index: 40;

  animation: throwBall 0.8s cubic-bezier(0.25, 0.8, 0.35, 1) forwards;
}

@keyframes throwBall {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg) scale(0.5);
  }

  8% {
    opacity: 1;
  }

  25% {
    transform: translate(-900px, -160px) rotate(180deg) scale(0.75);
  }

  50% {
    transform: translate(-720px, -330px) rotate(360deg) scale(0.95);
  }

  75% {
    transform: translate(-450px, -180px) rotate(540deg) scale(1);
  }

  100% {
    opacity: 0;
    transform: translate(-160px, -40px) rotate(720deg) scale(1.05);
  }
}
</style>
