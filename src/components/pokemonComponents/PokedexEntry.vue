<script setup lang="ts">
import formatFlavorText from "@/components/helpers/formatText";

defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="pokedex">
    <div class="{scrolling: shouldScroll}">
      {{ formatFlavorText(text) }}
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

.pokedex {
  border: 2px solid #cfc8bb;
  border-radius: 6px;
  background: white;

  padding: 1rem;

  flex: 1;
  min-height: 0;

  overflow: hidden;
}

.pokedex > div {
  line-height: 2rem;
}
</style>
