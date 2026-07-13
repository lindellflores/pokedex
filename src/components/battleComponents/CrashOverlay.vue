<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "restart"): void;
}>();

function handleClick() {
  console.log("Overlay clicked");
  emit("restart");
}
</script>

<template>
  <Transition name="crash">
    <div v-if="show" class="overlay" @click="handleClick">
      <div class="window">
        <div class="title">FATAL ERROR</div>

        <p class="line">Pokémon has crashed.</p>
        <p class="line">Donate to continue.</p>

        <div class="loading"><span>.</span><span>.</span><span>.</span></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.88);

  pointer-events: all;
  cursor: pointer;
  z-index: 99999;
  pointer-events: auto;
}

.window {
  width: 650px;

  padding: 40px;

  border: 6px solid white;
  background: #111;

  color: white;

  text-align: center;

  box-shadow: 0 0 40px black;
}

.title {
  margin-bottom: 35px;

  font-size: 3rem;
  letter-spacing: 5px;
}

.line {
  margin: 20px 0;

  font-size: 2rem;
}

.loading {
  margin-top: 35px;

  font-size: 3rem;
}

.loading span {
  animation: blink 1.2s infinite;
}

.loading span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%,
  80%,
  100% {
    opacity: 0.2;
  }

  40% {
    opacity: 1;
  }
}

.crash-enter-active {
  transition: opacity 0.35s;
}

.crash-leave-active {
  transition: opacity 0.2s;
}

.crash-enter-from,
.crash-leave-to {
  opacity: 0;
}
</style>
