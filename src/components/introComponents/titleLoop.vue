<script setup lang="ts">
import { ref } from "vue";

const video = ref<HTMLVideoElement | null>(null);

defineExpose({
  play: () => video.value?.play(),
});
</script>

<template>
  <video ref="video" class="video" autoplay loop playsinline>
    <source src="@/assets/intro/intro-screenOnly.webm" type="video/webm" />
  </video>
</template>

<style scoped>
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
