<script setup lang="ts">
import "@/assets/main.css";

import { nextTick, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import CustomTitle from "@/components/introComponents/customTitle.vue";
import IntroVideo from "@/components/introComponents/introVideo.vue";
import TitleLoop from "@/components/introComponents/titleLoop.vue";
import dingSound from "@/assets/sounds/A-effect.m4a";

const ding = new Audio(dingSound);

const router = useRouter();

type Screen = "custom" | "intro" | "title";

const screen = ref<Screen>("custom");

const titleVideo = ref<InstanceType<typeof TitleLoop>>();

const nextScreen: Record<Screen, Screen | null> = {
  custom: "intro",
  intro: "title",
  title: null,
};

async function handleStart() {
  if (screen.value === "title") {
    router.push("/home");
    ding.play();
    return;
  }

  screen.value = nextScreen[screen.value]!;
  await nextTick();

  if (screen.value === "title") {
    titleVideo.value?.play();
  }
}

function handleIntroEnded() {
  screen.value = "title";
  nextTick(() => titleVideo.value?.play());
}

function handleKey(e: KeyboardEvent) {
  if (e.key === "Enter") handleStart();
}

onMounted(() => window.addEventListener("keydown", handleKey));
onUnmounted(() => window.removeEventListener("keydown", handleKey));
</script>

<template>
  <div class="intro" @click="handleStart">
    <transition name="fade" mode="out-in">
      <CustomTitle v-if="screen === 'custom'" />

      <IntroVideo
        v-else-if="screen === 'intro'"
        ref="introVideo"
        @ended="handleIntroEnded"
      />

      <TitleLoop v-else ref="titleVideo" />
    </transition>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  cursor: pointer;

  background-image: url("@/assets/intro/emerald-bg.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
