<script setup lang="ts">
import type { Pokemon } from "@/interface/pokemonInterface";
import formatName from "@/components/helpers/formatName";

defineProps<{
  pokemon: Pokemon;
}>();
</script>

<template>
  <div class="stats">
    <span class="statsTitle">STATS</span>

    <div
      v-for="stat in pokemon.stats"
      :key="stat.stat.name"
      class="stat"
    >
      <span class="statName">
        {{ formatName(stat.stat.name) }}
      </span>

      <div class="bar">
        <div
          class="fill"
          :style="{
            width: `${(stat.base_stat / 255) * 100}%`,
          }"
        ></div>
      </div>

      <span class="statValue">
        {{ stat.base_stat }}
      </span>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "PokeFont";
  src: url("../pokemonbw.otf");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

* {
  font-family: "PokeFont", sans-serif;
  font-size: 2rem;
}
.stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #cfc8bb;
  background: white;
  padding: 1rem;
  gap: 0.5rem;
}

.stats > span {
  text-align: center;
  margin-bottom: 6px;
}

.statsTitle {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.stat {
  display: grid;
  grid-template-columns: 4rem 1fr 2rem;
  gap: 0.1rem;
  align-items: center;
}

.statName {
  text-transform: uppercase;
  font-size: 1.3rem;
}

.statValue {
  text-align: right;
  font-size: 1.3rem;
}

.bar {
  width: 100%;
  height: 14px;

  background: #ddd;

  border: 2px solid black;

  overflow: hidden;
}

.fill {
  height: 100%;

  background: radial-gradient(
    rgb(1, 129, 1),
    rgb(238, 238, 118)
  );

  transition: width 0.4s ease;
}
</style>