<script setup lang="ts">
import "@/assets/main.css";
import { ref, computed, onMounted, watch, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { PokemonListItem } from "@/interface/pokemonInterface.ts";

import { usePokemon } from "@/composables/usePokemon";
import { usePokemonList } from "@/composables/usePokemonList";
import { useEvolution } from "@/composables/useEvolution";
import { usePokemonForms } from "@/composables/usePokemonForms";
import { useMusic } from "@/composables/useMusic";

import PokemonCarousel from "@/components/pokemonComponents/PokemonCarousel.vue";
import PokemonInfo from "@/components/pokemonComponents/PokemonInfo.vue";
import PokemonStats from "@/components/pokemonComponents/PokemonStats.vue";
import PokedexEntry from "@/components/pokemonComponents/PokedexEntry.vue";
import PokemonSearch from "@/components/pokemonComponents/PokemonSearch.vue";
import EvolutionAnimation from "@/components/pokemonComponents/EvolutionAnimation.vue";
import ErrorDialogue from "@/components/pokemonComponents/ErrorDialogue.vue";
import PokemonActions from "@/components/pokemonComponents/PokemonActions.vue";
import { versionPriority } from "@/components/helpers/versionPriority";

import pokeball from "@/assets/loading/pokeball.gif";

const route = useRoute();
const router = useRouter();

const { pokemon, species, loading, error, loadPokemon } = usePokemon();

const { searchText, filteredPokemonList, loadPokemonList } = usePokemonList();

const {
  play,
  pause,
  resume,
  playEvolution,
  stopEvolution,
  playEvolutionComplete,
} = useMusic();

const { evolve, isEvolving, isFlashing, isPulsing, isShaking, isSparkling } =
  useEvolution(pokemon, species, router, loadPokemon, {
    pause,
    resume,
    playEvolution,
    stopEvolution,
    playEvolutionComplete,
  });

const { megaEvolve, gigantamax } = usePokemonForms(pokemon, species, router);

const dialogOpen = ref(false);
const dialogMessage = ref("");

const rightPanel = ref<HTMLElement | null>(null);

async function handleEvolution() {
  const error = await evolve();

  if (error) {
    dialogMessage.value = error;
    dialogOpen.value = true;
  }
}

function handleMegaEvolution() {
  const error = megaEvolve();

  if (error) {
    dialogMessage.value = error;
    dialogOpen.value = true;
  }
}

function handleGigantamax() {
  const error = gigantamax();

  if (error) {
    dialogMessage.value = error;
    dialogOpen.value = true;
  }
}

const pokedexEntry = computed(() => {
  if (!species.value) return null;

  for (const version of versionPriority) {
    const entry = species.value.flavor_text_entries.find(
      (entry) => entry.language.name === "en" && entry.version.name === version,
    );

    if (entry) {
      return entry;
    }
  }

  return null;
});

function searchPokemon() {
  if (filteredPokemonList.value.length === 0) return;
  const firstPokemon = filteredPokemonList.value[0];

  if (!firstPokemon) return;

  router.push(`/pokemon/${firstPokemon.name}`);
}

function exitHandle() {
  router.push("/home");
}

async function selectPokemon(selected: PokemonListItem) {
  await router.push({
    name: "pokemon",
    params: {
      name: selected.name,
    },
  });
}

onMounted(async () => {
  play();
  await Promise.all([
    loadPokemon(route.params.name as string),
    loadPokemonList(),
  ]);
});

watch(
  () => route.params.name,
  (name) => {
    loadPokemon(name as string);
  },
);

onUnmounted(() => {
  pause();
});
</script>

<template>
  <EvolutionAnimation :show="isEvolving" />

  <ErrorDialogue
    :show="dialogOpen"
    :message="dialogMessage"
    @close="dialogOpen = false"
  />

  <div class="overall">
    <!-- LEFT PANEL -->
    <section class="leftPanel">
      <aside class="pokemonDetails">
        <div v-if="loading">
          <div class="loading">
            <img
              v-for="i in 3"
              :key="i"
              :src="pokeball"
              class="pokeball"
              :style="{ animationDelay: `${(i - 1) * 0.2}s` }"
            />
          </div>
        </div>

        <div v-else-if="error" class="errorContainer">
          <img :src="pokeball" class="errorBall" />

          <h2>POKéMON NOT FOUND</h2>

          <p>{{ error }}</p>
          <p id="searchAgain">Please search again</p>
        </div>

        <div v-else-if="pokemon" class="pokecontainer">
          <div class="topSection">
            <div class="leftInfo">
              <PokemonInfo
                :pokemon="pokemon"
                :species="species"
                :isEvolving="isEvolving"
                :isFlashing="isFlashing"
                :isPulsing="isPulsing"
                :isShaking="isShaking"
                :isSparkling="isSparkling"
              />

              <PokemonActions
                @evolve="handleEvolution"
                @mega="handleMegaEvolution"
                @gigantamax="handleGigantamax"
              />
            </div>

            <div class="rightSide">
              <PokemonStats :pokemon="pokemon" />

              <PokedexEntry :text="pokedexEntry?.flavor_text ?? ''" />
            </div>
          </div>
        </div>
      </aside>

      <PokemonSearch @filter="searchText = $event" @search="searchPokemon" />
    </section>

    <!-- RIGHT PANEL -->
    <section ref="rightPanel" class="rightPanel" tabindex="0">
      <PokemonCarousel
        :pokemonList="filteredPokemonList"
        :searchText="searchText"
        :selectedPokemon="pokemon?.name ?? ''"
        @select="selectPokemon"
      />

      <button class="exitButton" @click="exitHandle">EXIT</button>
    </section>
  </div>
</template>
<style scoped>
* {
  font-family: "PokeFont", sans-serif;
  font-size: 2rem;
}

.overall {
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;

  padding: 2rem;
  box-sizing: border-box;

  background-image: url("@/assets/baackground/background2.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  image-rendering: pixelated;
}

.leftPanel {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rightPanel {
  display: grid;
  grid-template-rows: 1fr 80px;

  gap: 1rem;
  min-height: 0;

  position: relative;
  outline: none;
}

.rightPanel:hover {
  outline: none;
}

.rightPanel:focus-visible {
  outline: none;
}

.pokemonDetails {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.pokecontainer {
  display: grid;
  grid-template-rows: auto 1fr auto;

  width: 100%;
  height: 100%;

  padding: 1.5rem;
  box-sizing: border-box;

  border: 4px solid #1f1f1f;

  box-shadow:
    3px 0 #1f1f1f,
    -3px 0 #1f1f1f,
    0 3px #1f1f1f,
    0 -3px #1f1f1f;
  background: rgb(0, 104, 96);

  overflow: auto;
}

.topSection {
  display: grid;
  grid-template-columns: 3fr 2fr;

  gap: 1rem;
  min-height: 0;
}

.leftInfo {
  display: grid;
  grid-template-rows: auto 1fr auto;

  min-height: 0;
}

.rightSide {
  display: grid;
  grid-template-rows: auto auto;

  gap: 1rem;
}

.exitButton {
  justify-self: end;
  align-self: end;

  width: 120px;
  height: 60px;

  font-size: 1rem;
  cursor: pointer;
  border: 4px solid black;
  border-radius: 10px;
  background-color: rgb(151, 93, 205);
  font-family: "PokeFont", sans-serif;
  color: white;

  text-shadow:
    2px 2px 0 rgb(112, 112, 112),
    3px 3px 0 rgb(112, 112, 112),
    4px 4px 3px rgb(112, 112, 112);
}

.exitButton:hover {
  background-color: rgb(195, 143, 243);
}

/* ---------- Loading ---------- */

.loading {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 2rem;

  width: 100%;
  height: 100%;
}

.pokeball {
  width: 80px;

  image-rendering: pixelated;
  animation: bounce 0.8s infinite ease-in-out;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) rotate(-10deg);
  }

  50% {
    transform: translateY(-25px) rotate(10deg);
  }
}

/* ---------- Error ---------- */

.errorContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  min-height: 650px;

  gap: 1.5rem;
  text-align: center;
}

.errorBall {
  width: 80px;

  image-rendering: pixelated;
  animation: shake 1s infinite;
}

.errorContainer h2 {
  margin: 0;

  font-size: 5rem;
  letter-spacing: 5px;
  color: white;
}

.errorContainer p {
  margin: 0;

  max-width: 450px;

  font-size: 1.6rem;
  color: white;
}

#searchAgain {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 3px;
  color: white;
}

@keyframes shake {
  0%,
  100% {
    transform: rotate(0deg);
  }

  20% {
    transform: rotate(-10deg);
  }

  40% {
    transform: rotate(10deg);
  }

  60% {
    transform: rotate(-10deg);
  }

  80% {
    transform: rotate(10deg);
  }
}

/* ---------- Responsive ---------- */

@media (max-width: 1400px) {
  .overall {
    overflow-y: auto;
    align-items: start;
  }

  .leftPanel,
  .pokemonDetails,
  .pokecontainer {
    height: auto;
    min-height: fit-content;
    overflow: visible;
  }

  .topSection {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1100px) {
  .overall {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;

    height: auto;
    overflow-y: auto;
  }

  .rightPanel {
    height: 650px;
  }
}
</style>
