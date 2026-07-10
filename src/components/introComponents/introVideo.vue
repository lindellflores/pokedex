<script setup lang="ts">
import { ref, onMounted } from "vue";
import introVideo from "@/assets/intro/fullintro-emerald.webm";

const video = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  video.value?.play();
});
</script>

<template>
  <video ref="video" class="video" playsinline @ended="$emit('ended')">
    <source :src="introVideo" type="video/webm" />
  </video>
</template>

<style scoped>
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
