<script setup lang="ts">
import { ref, watch } from "vue";

const pokemonName = ref("");

const emit = defineEmits<{
  (e: "filter", text: string): void;
  (e: "search", name: string): void;
}>();

watch(pokemonName, (value) => {
  emit("filter", value);
});

function searchPokemon() {
  if (!pokemonName.value.trim()) return;

  emit("search", pokemonName.value);
  emit("filter",pokemonName.value);

  pokemonName.value = "";
}
</script>

<template>
  <section class="searchContainer">
    <div class="searchTitle">
      Looking for a certain Pokemon?
    </div>

    <input
      class="input"
      v-model="pokemonName"
      placeholder="Search here!"
      @keyup.enter="searchPokemon"
    />
  </section>
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

.searchContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 1rem;

  border: 4px solid black;

  background: #f7f1e7;
  margin-top: 1rem;
}

.searchTitle {

  margin-bottom: 0.5rem;
}

.input {
  border: none;

  outline: none;

  background: transparent;

}
</style>