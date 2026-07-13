<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import GrassTransition from "./GrassTransition.vue";
import BattlePlatforms from "./BattlePlatforms.vue";
import TrainerEntrance from "./TrainerEntrance.vue";
import EnemyEntrance from "./EnemyEntrance.vue";
import PokeballThrow from "./PokeballThrow.vue";
import BattleHUD from "./BattleHUD.vue";
import PlayerPokemon from "./PlayerPokemon.vue";
import cry from "@/assets/sounds/cries_pokemon_legacy_132.ogg";
import CrashOverlay from "@/components/battleComponents/CrashOverlay.vue";

const router = useRouter();

const enemyCries = new Audio(cry);

const crash = ref(false);

const hud = ref(false);

const playerPokemon = ref(false);

const grass = ref(false);

const platforms = ref(false);

const trainer = ref(false);

const enemy = ref(false);

const pokeball = ref(false);

const blackBars = ref(true);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function restartGame() {
  router.push("/home");
}

onMounted(async () => {
  await sleep(900);

  blackBars.value = false;
  grass.value = true;

  await sleep(900);
  platforms.value = true;

  await sleep(500);
  trainer.value = true;

  enemy.value = true;

  await sleep(3000);
  pokeball.value = true;

  await sleep(1200);

  await sleep(800);

  playerPokemon.value = true;

  await sleep(300);

  enemyCries.play();

  hud.value = true;

  await sleep(2500);

  crash.value = true;
});
</script>

<template>
  <div class="transition">
    <div class="blackBar top" :class="{ open: !blackBars }" />

    <div class="blackBar bottom" :class="{ open: !blackBars }" />

    <GrassTransition v-if="grass" />

    <BattlePlatforms v-if="platforms" />

    <EnemyEntrance v-if="enemy" />

    <TrainerEntrance v-if="trainer" @throw="pokeball = true" />
    <PokeballThrow v-if="pokeball" />
    <PlayerPokemon v-if="playerPokemon" />

    <BattleHUD v-if="hud" />

    <CrashOverlay :show="crash" @restart="restartGame" />
  </div>
</template>

<style scoped>
.transition {
  position: absolute;

  inset: 0;

  overflow: hidden;

  pointer-events: none;
}

.blackBar {
  position: absolute;

  left: 0;

  width: 100%;

  height: 50%;

  background: black;

  z-index: 999;
}

.top {
  top: 0;

  transform-origin: top;

  transition: transform 0.9s ease;
}

.bottom {
  bottom: 0;

  transform-origin: bottom;

  transition: transform 0.9s ease;
}

.top.open {
  transform: translateY(-100%);
}

.bottom.open {
  transform: translateY(100%);
}
</style>
