<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="textbox">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.textbox {
  position: absolute;

  left: 50%;
  bottom: 0;

  transform: translateX(-50%);

  width: 100%;
  height: 11.2rem;

  background: wheat;

  border-top: 8px solid #202020;

  display: flex;
  align-items: flex-start;

  padding: 24px 40px;

  box-sizing: border-box;

  z-index: 50;
}

p {
  font-size: 4rem;
  line-height: 1;
}
</style>
