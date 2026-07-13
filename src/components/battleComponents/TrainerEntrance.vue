<script setup lang="ts">
import { ref, onMounted } from "vue";

import still from "@/assets/battle/trainerStill.png";
import startThrow from "@/assets/battle/trainerStartThrow.png";
import midThrow from "@/assets/battle/trainerMidThrow.png";
import fullThrow from "@/assets/battle/trainerFullThrow.png";

const frame = ref(still);
const ANIMATION_DURATION = 2700;

const emit = defineEmits<{
  (e: "throw"): void;
}>();

onMounted(async () => {
  await sleep(ANIMATION_DURATION * 0.9);

  frame.value = startThrow;

  await sleep(200);

  frame.value = midThrow;

  await sleep(150);

  frame.value = fullThrow;

  emit("throw");
});
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>

<template>
  <img :src="frame" class="trainer" />
</template>

<style scoped>
.trainer {
  position: absolute;

  bottom: 115px;
  right: -300px;

  width: 330px;

  image-rendering: pixelated;

  animation: trainerSlide 3.5s ease-out forwards;

  z-index: 4;
}

@keyframes trainerSlide {
  0% {
    transform: translateX(0);
  }
  70% {
    transform: translateX(-1350px);
  }

  100% {
    transform: translateX(-2000px);
  }
}
</style>
