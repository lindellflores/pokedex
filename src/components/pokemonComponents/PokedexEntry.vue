<script setup lang="ts">
import formatFlavorText from "@/components/helpers/formatText";

defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="pokedex">
    <p>
      {{ formatFlavorText(text) }}
    </p>
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
  border:2px solid #cfc8bb;
  background: white;
  padding:1rem;

  overflow:auto;

  line-height:1.4;

  text-align:justify;
}
.pokedex p {
  margin: 0;
  font-size: 2;
}
</style>