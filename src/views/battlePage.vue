<script setup lang="ts">
import { ref, onMounted } from 'vue'

const video = ref<HTMLVideoElement>()

onMounted(async () => {
  try {
    await video.value?.play()
  } catch (err) {
    console.log('Autoplay blocked')
  }
})
</script>

<template>
  <video ref="video">
  </video>

</template>


