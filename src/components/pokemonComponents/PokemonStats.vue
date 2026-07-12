<script setup lang="ts">
import type { Pokemon } from "@/interface/pokemonInterface";
import formatName from "@/components/helpers/formatName";

defineProps<{
  pokemon: Pokemon;
}>();
</script>

<template>
  <div class="stats">
    <div class="statsHeader">
      STATS
    </div>

    <div class="statsBody">
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
              width: `${(stat.base_stat / 255) * 100}%`
            }"
          />
        </div>

        <span class="statValue">
          {{ stat.base_stat }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "PokeFont", sans-serif;
  font-size: 2rem;
}
.stats {
  border: 2px solid rgb(96, 176, 136);
  background: white;
}

.statsHeader {
  background: rgb(96, 176, 136);
  color: white;

  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 3px;

  padding: 1rem;
  text-shadow:
    1px 1px 0 #3d6b4f,
    2px 2px 0 #2b4a36;
}

.statsBody {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  padding: 1rem;
}

.stats > span {
  text-align: center;
  margin-bottom: 6px;
}

.statsTitle {
  background-color: rgb(96, 176, 136);
  font-weight: bold;
  margin-bottom: 0.5rem;
  padding: 1rem;
  margin-top:-1rem;
  color: white;
  letter-spacing: 3px;
}

.stat {
  display: grid;
  grid-template-columns: 6.5rem 1fr 3.7rem;
  gap: 0.1rem;
  align-items: center;
}

.statName {
  text-transform: uppercase;
  font-size: 1.7rem;
  padding-left: 1rem;
}

.statValue {
  text-align: right;
  font-size: 1.7rem;
  padding-right: 1rem;
}

.bar {
  width: 100%;
  height: 15px;

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