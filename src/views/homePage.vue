<script setup lang="ts">
import { useRouter } from "vue-router";
import encounter from "@/assets/sounds/BattleStart.mp3";

const BattleStart = new Audio(encounter);

const router = useRouter();

function handleChoice() {
  router.push("/pokemon/bulbasaur");
  BattleStart.play();
}
</script>

<template>
  <transition name="bounce" appear>
    <div>
      <button @click="handleChoice">Pokedex</button>
    </div>
  </transition>
</template>

<style scoped>
@font-face {
  font-family: "PokeFont";
  src: url("../assets/fonts/pokemonbw.otf");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
</style>
