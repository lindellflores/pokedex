<script setup lang="ts">
import enemyPlatform from "@/assets/battle/enemyPlatform.png";
import playerPlatform from "@/assets/battle/playerPlatform.png";
</script>

<template>
  <div class="platformLayer">
    <img :src="enemyPlatform" class="enemyPlatform" />

    <img :src="playerPlatform" class="playerPlatform" />
  </div>
</template>

<style scoped>
.platformLayer {
  position: absolute;
  inset: 0;

  pointer-events: none;
}

.enemyPlatform,
.playerPlatform {
  position: absolute;

  image-rendering: pixelated;
}

.enemyPlatform {
  width: 600px;

  top: 280px;
  left: 750px;

  animation: enemyPlatformSlide 2s ease-out forwards;

  z-index: 0;
}

.playerPlatform {
  width: 1000px;

  bottom: 180px;
  right: 500px;

  animation: playerPlatformSlide 2s ease-out forwards;
  z-index: 0;
}

@keyframes enemyPlatformSlide {
  from {
    transform: translateX(-1300px);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes playerPlatformSlide {
  from {
    transform: translateX(1200px);
  }

  to {
    transform: translateX(0);
  }
}
</style>
