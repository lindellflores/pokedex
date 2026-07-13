<script setup lang="ts">
import BattleTransition from "@/components/battleComponents/BattleTransition.vue";
import BattleBackground from "@/components/battleComponents/BattleBackground.vue";
import BattleTextbox from "@/components/battleComponents/BattleTextBox.vue";
import battleMusic from "@/assets/sounds/BattleStart.mp3";

import { onMounted, ref } from "vue";

const music = new Audio(battleMusic);

const battleStarted = ref(false);

function onTransitionFinished() {
  battleStarted.value = true;
}

onMounted(() => {
  music.play();
});
</script>

<template>
  <div class="battlePage">
    <BattleBackground />

    <BattleTransition v-if="!battleStarted" @finished="onTransitionFinished" />

    <BattleTextbox
      :message="
        battleStarted ? 'What will Sceptile do?' : 'A wild Pokémon appeared!'
      "
    />
  </div>
</template>

<style scoped>
.battlePage {
  position: relative;

  width: 100vw;
  height: 100vh;

  overflow: hidden;

  background: black;
}
</style>
