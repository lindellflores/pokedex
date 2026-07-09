<template>
  <video
    ref="video"
    class="video"
    autoplay
    loop
    playsinline
  >
    <source
      src="@/assets/intro/intro-screenOnly.mp4"
      type="video/mp4"
    />
  </video>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";

const video = ref<HTMLVideoElement | null>(null);

defineExpose({
  play: () => video.value?.play()
});
</script>
<style scoped>
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>