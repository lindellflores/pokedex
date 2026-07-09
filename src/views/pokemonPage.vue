<script setup lang="ts">
import "../assets/main.css";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TypeBadge from "../components/pokemonComponents/typeBadges.vue";
import type { Pokemon } from "../interface/pokemonInterface.ts";
import type { PokemonSpecies } from "../interface/pokemonSpeciesInt.ts";
import formatName from "@/components/helpers/formatName";
import formatFlavorText from "@/components/helpers/formatText.ts";
import normalizeName from "@/components/helpers/normalizeName.ts";
import type { PokemonListItem } from "../interface/pokemonListItem.ts";
import PokemonCarousel from "@/components/pokemonComponents/PokemonCarousel.vue";
import { useMusic } from "@/composables/useMusic";

const route = useRoute();
const { play } = useMusic();
const pokemonList = ref<PokemonListItem[]>([]);
const species = ref<PokemonSpecies | null>(null);
const pokemon = ref<Pokemon | null>(null);
const loading = ref(false);

const error = ref("");
const pokemonName = ref("");
const router = useRouter();

function searchPokemon() {
  if (!pokemonName.value.trim()) return;

  router.push(`/pokemon/${pokemonName.value.toLowerCase()}`);
  pokemonName.value = "";
}

const sprite = computed(() => {
  const name = pokemon.value?.name ? normalizeName(pokemon.value.name) : "";

  return (
    pokemon.value?.sprites.versions["generation-v"]["black-white"].animated
      ?.front_default ??
    (name ? `https://play.pokemonshowdown.com/sprites/ani/${name}.gif` : "")
  );
});

const versionPriority = [
  "sword",
  "shield",
  "alpha-sapphire",
  "omega-ruby",
  "scarlet",
  "violet",
  "sun",
  "x",
];

const pokedexEntry = computed(() => {
  if (!species.value) return null;

  for (const version of versionPriority) {
    const entry = species.value.flavor_text_entries.find(
      (e) => e.language.name === "en" && e.version.name === version,
    );
    if (entry) {
      return entry;
    }
  }
  return null;
});

async function loadPokemon() {
  loading.value = true;
  error.value = "";

  try {
    const pokemonName = normalizeName(route.params.name as string);
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
    );

    if (!pokemonResponse.ok) {
      throw new Error(`${pokemonName} not found`);
    }

    const fetchedPokemon: Pokemon = await pokemonResponse.json();

    pokemon.value = fetchedPokemon;

    const cry = new Audio(fetchedPokemon.cries.latest);
    cry.play();

    const speciesResponse = await fetch(fetchedPokemon.species.url);

    if (!speciesResponse.ok) {
      throw new Error("Species not found");
    }

    species.value = await speciesResponse.json();
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Something went wrong";
    pokemon.value = null;
    species.value = null;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadPokemon();
  play();
});
watch(
  () => route.params.name,
  () => {
    loadPokemon();
  },
);
onMounted(async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");

  const data = await response.json();
  pokemonList.value = data.results;
});

async function selectPokemon(selected: PokemonListItem) {
  await router.push({
    name: "pokemon",

    params: {
      name: selected.name,
    },
  });
}
</script>

<template>
  <div class="overall">
    <!-- LEFT PANEL -->
    <section class="leftPanel">
      <aside class="pokemonDetails">
        <div v-if="loading">Loading...</div>

        <div v-else-if="error">
          {{ error }}
        </div>

        <div v-else-if="pokemon" class="pokecontainer">
          <!-- PokemonNameTitle -->
          <div class="topSection">
            <div class="leftInfo">
              <div class="PokemonMain">
                <span class="pokename">
                  No.{{ pokemon.id.toString().padStart(3, "0") }}
                  -
                  {{ formatName(pokemon.name) }}
                </span>

                <p class="genus">
                  The
                  {{
                    species?.genera.find((g) => g.language.name === "en")?.genus
                  }}
                </p>
              </div>

              <!-- sprite -->

              <div class="sprite">
                <img
                  v-if="sprite.includes('play.pokemonshowdown.com')"
                  :src="sprite"
                  class="showdown-sprite"
                />

                <img v-else :src="sprite" class="normal-sprite" />
              </div>

              <!-- types + ability -->

              <div class="secondRow">
                <div class="types">
                  <span>TYPE:</span>

                  <div class="typeimg">
                    <TypeBadge
                      v-for="type in pokemon.types"
                      :key="type.slot"
                      :type="type.type.name"
                    />
                  </div>
                </div>

                <div class="abilities">
                  <span>ABILITY:</span>

                  <div class="abilitylist">
                    <p>
                      {{
                        pokemon.abilities
                          .filter((a) => !a.is_hidden)
                          .map((a) => formatName(a.ability.name))
                          .join(", ")
                      }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="panelButtons">
                <button id="EvolveBtn">Evolve</button>
                <button id="MegaBtn">Mega Evolution</button>
                <button id="GmaxBtn">Gigantamax</button>
              </div>
            </div>

            <!-- stats -->
            <div class="rightSide">
              <div class="stats">
                <span>STATS</span>
                <div
                  v-for="stat in pokemon.stats"
                  :key="stat.stat.name"
                  class="stat"
                >
                  <span>
                    {{ formatName(stat.stat.name) }}
                  </span>

                  <div class="bar">
                    <div
                      class="fill"
                      :style="{
                        width: `${(stat.base_stat / 200) * 100}%`,
                      }"
                    />
                  </div>

                  <span>
                    {{ stat.base_stat }}
                  </span>
                </div>
              </div>

              <!-- description -->

              <div class="pokedex">
                <p>
                  {{ formatFlavorText(pokedexEntry?.flavor_text ?? "") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- SEARCH -->

      <section class="searchContainer">
        <div class="searchTitle">Looking for a certain Pokemon?</div>

        <input
          class="input"
          v-model="pokemonName"
          placeholder="Search here!"
          @keyup.enter="searchPokemon"
        />
      </section>
    </section>

    <!-- RIGHT PANEL -->

    <section class="rightPanel">
      <PokemonCarousel :pokemonList="pokemonList" @select="selectPokemon" />

      <button class="exitButton">EXIT</button>
    </section>
  </div>
</template>

<style scoped>
.rightSide {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 1rem;
}

.topSection {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;
  min-height: 0;
  flex: 1;
}

.leftInfo {
  display: grid;
  grid-template-rows:
    auto
    1fr
    auto
    auto;

  gap: 1rem;
  min-height: 0;
}

.panelButtons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
}
/* #EvolveBtn {
  background-color: #ffae17;
}
#MegaBtn {
  background-color: deepskyblue;
}
#GmaxBtn {
  background-color: orangered;
} */

.panelButtons button {
  padding: 1rem;
  border: 1px #000000 solid;
  border-radius: 10px;
  box-shadow:
    0 2px 0 0 black,
    0 -2px 0 0 black,
    2px 0 0 0 black,
    -2px 0 0 0 black;
  background-color: aquamarine;
}

.panelButtons :hover {
  background-color: rgb(181, 227, 243);
}

.leftPanel {
  display: grid;
  grid-template-rows:
    1fr
    90px;

  gap: 1rem;
  min-height: 0;
}

.rightPanel {
  position: relative;
  overflow: hidden;
}

.overall {
  height: 100vh;
  display: grid;
  grid-template-columns:
    3fr
    2fr;

  gap: 2rem;
  padding: 1rem;
  box-sizing: border-box;
  background-image: url("/src/assets/baackground/background1.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.pokemonDetails {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.secondRow {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
}

.exitButton {
  justify-self: end;
  align-self: end;
  width: 120px;
  height: 60px;
  font-size: 1.3rem;
  cursor: pointer;
}

.stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #cfc8bb;
  background: white;
  padding-top: -2rem;
  gap: 0.5rem;
}

.stats > span {
  text-align: center;
  margin-bottom: 6px;
}

.stat {
  display: grid;
  grid-template-columns:
    80px
    1fr
    50px;
  gap: 1.2rem;
  align-items: center;
}

.bar {
  width: 100%;
  height: 14px;
  background: #ddd;
  overflow: hidden;
  border: 2px black solid;
}

.fill {
  height: 100%;
  background: radial-gradient(rgb(1, 129, 1), rgb(238, 238, 118));
  transition: width 0.4s ease;
}

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

.PokemonMain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.pokename {
  text-transform: uppercase;
  font-size: 3rem;
  font-weight: 800;
  margin: 5px;
}
.genus {
  margin: -0.1rem;
  font-size: 1.8rem;
}
html,
body {
  min-height: 100vh;
  margin: 0;
}

.abilities {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.abilities > span {
  font-weight: bold;
  margin: 0;
}

.abilitylist {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.1rem;
}

.abilitylist > p {
  margin-block: 0;
  text-transform: capitalize;
}
.pokecontainer {
  display: grid;

  grid-template-rows:
    3fr
    1.3fr
    70px;

  gap: 0.8rem;

  height: 100%;
  gap: 1rem;
  padding: 2rem;
  border: 4px solid black;
  background: #f7f1e7;
  overflow: hidden;
  box-sizing: border-box;
}

.searchContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border: 4px solid black;
  background: #f7f1e7;
}
.searchTitle {
  margin-bottom: 0.5rem;
}
.searchContainer input {
  border: none;
  outline: none;
  background: transparent;
}

.rightPanel {
  display: grid;
  grid-template-rows:
    1fr
    80px;

  gap: 1rem;
  min-height: 0;
  position: relative;
  overflow: hidden;
}

.secondRow,
.stats {
  border: 2px solid #cfc8bb;
  border-radius: 6px;
  background: white;
  padding: 1rem;
}

.sprite {
  border: 2px solid #cfc8bb;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-image: url("@/assets/background.jpg");
}

.normal-sprite {
  transform: scale(2);
}

.showdown-sprite {
  height: 40%;
  width: auto;
  image-rendering: pixelated;
}

.pokedex {
  border: 2px solid #cfc8bb;
  background: white;
  padding-left: 1rem;
  padding-right: 1rem;

  text-align: justify;
  line-height: 1.7rem;
}

.pokename::first-letter {
  text-transform: uppercase;
}

.pokecontainer > h2 {
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
}

.sprite {
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sprite img {
  transform: scale(2.4);
  image-rendering: pixelated;
}
.types {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
}

.typeimg {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.types > span {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
}
.pokemonDetails,
.pokecontainer,
.topSection,
.leftInfo,
.rightSide {
  min-height: 0;
}
</style>
