<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

const pokemonName = ref("");

const emit = defineEmits<{
  (e: "filter", text: string): void;
  (e: "search"): void;
}>();

watch(pokemonName, value => {
  emit("filter", value);
});

function searchPokemon() {
  emit("search");
}

/* ---------------- Typewriter ---------------- */

const fullTitle = "Choose a POKéMON to view their details!";
const fullSubtitle = "Looking for a certain POKéMON?";

const title = ref("");
const subtitle = ref("");

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(text: string, target: typeof title) {
  target.value = "";

  for (const letter of text) {
    target.value += letter;
    await sleep(35);
  }
}

onMounted(async () => {
  await typeText(fullTitle, title);

  await sleep(300);

  await typeText(fullSubtitle, subtitle);
});
</script>

<template>
  <section class="searchContainer">
    <div class="searchTitle">
      {{ title }}
    </div>

    <div>
      {{ subtitle }}

      <input
        class="input"
        v-model="pokemonName"
        placeholder="Search here!"
        @keyup.enter="searchPokemon"
      />
    </div>
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

 border:3px solid #000000;
border-radius:10px;

box-shadow:
0 3px #222;

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

.input::placeholder{
 color: rgb(223, 223, 223);

}

.cursor {
  animation: blink .8s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>