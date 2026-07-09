<template>
  <video
    ref="video"
    class="video"
    playsinline
    @ended="$emit('ended')"
  >
    <source :src="introVideo" type="video/mp4" />
  </video>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import introVideo from "@/assets/intro/fullintro-emerald.mp4";

const emit = defineEmits<{
  (e: "ended"): void;
}>();

const video = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  video.value?.play();
});
</script>

<style scoped>
.video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>