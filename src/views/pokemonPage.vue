<script setup lang="ts">
import "../assets/main.css";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Pokemon } from "@/interface/pokemonInterface.ts";
import type { PokemonSpecies } from "@/interface/pokemonSpeciesInt.ts";
import formatFlavorText from "@/components/helpers/formatText";
import normalizeName from "@/components/helpers/normalizeName";
import type { PokemonListItem } from "@/interface/pokemonListItem.ts";
import PokemonCarousel from "@/components/pokemonComponents/PokemonCarousel.vue";
import { useMusic } from "@/composables/useMusic";
import { gigantamaxMap } from "@/components/helpers/gigantamax"
import PokemonInfo from "@/components/pokemonComponents/PokemonInfo.vue";
import { versionPriority } from "@/components/helpers/versionPriority";
import PokemonStats from "@/components/pokemonComponents/PokemonStats.vue";
import PokedexEntry from "@/components/pokemonComponents/PokedexEntry.vue";
import PokemonSearch from "@/components/pokemonComponents/PokemonSearch.vue";


const route = useRoute();
const { play } = useMusic();
const pokemonList = ref<PokemonListItem[]>([]);
const species = ref<PokemonSpecies | null>(null);
const pokemon = ref<Pokemon | null>(null);
const loading = ref(false);
const favorites = ref<string[]>([])
const searchText = ref("")

const error = ref("");
const router = useRouter();

function toggleFavorite() {
  if (!pokemon.value) return

  const name = pokemon.value.name
  const index = favorites.value.indexOf(name)

  if (index === -1) {
    favorites.value.push(name)
  } else {
    favorites.value.splice(index, 1)
  }
}
const isFavorite = computed(() => {
  if (!pokemon.value) return false

  return favorites.value.includes(pokemon.value.name)
})

function megaEvolve() {
  if (!species.value) return

  const megaForms = species.value.varieties.filter(v =>
    v.pokemon.name.includes("mega")
  )

  if (megaForms.length === 0) {
    alert("This Pokémon has no Mega Evolution.")
    return
  }

  const mega = megaForms[0]

if (!mega) {
  alert("This Pokémon has no Mega Evolution.")
  return
}

router.push(`/pokemon/${mega.pokemon.name}`)

}


function gigantamax() {
  if (!pokemon.value) return

  const gmax = gigantamaxMap[pokemon.value.name]

  if (!gmax) {
    alert("This Pokémon cannot Gigantamax.")
    return
  }

  router.push(`/pokemon/${gmax}`)
}

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

function searchPokemon(name: string) {
  router.push(`/pokemon/${name.toLowerCase()}`);
}

const filteredPokemonList = computed(() => {
  if (!searchText.value) {
    return pokemonList.value;
  }

  return pokemonList.value.filter((pokemon) =>
    pokemon.name.startsWith(searchText.value.toLowerCase())
  );
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

async function evolve() {
  if (!species.value || !pokemon.value) return

  const response = await fetch(species.value.evolution_chain.url)
  const evolutionData = await response.json()

  const chain = evolutionData.chain

  // First stage
  if (
    chain.species.name === pokemon.value.name &&
    chain.evolves_to.length > 0
  ) {
    router.push(`/pokemon/${chain.evolves_to[0].species.name}`)
    return
  }

  // Second stage
  if (chain.evolves_to.length > 0) {
    const secondStage = chain.evolves_to[0]

    if (
      secondStage.species.name === pokemon.value.name &&
      secondStage.evolves_to.length > 0
    ) {
      router.push(`/pokemon/${secondStage.evolves_to[0].species.name}`)
      return
    }
  }

  alert("This Pokémon cannot evolve.")
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

  pokemonList.value = data.results.map(
    (pokemon: PokemonListItem, index: number) => ({
      id: index + 1,
      name: pokemon.name,
      url: pokemon.url,
    }),
  );
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
              <PokemonInfo :pokemon="pokemon" :species="species"/>
              <div class="panelButtons">
                <button @click="evolve"id="EvolveBtn">EVOLVE</button>
                <button @click="megaEvolve" id="MegaBtn">MEGA EVOLVE</button>
                <button @click="gigantamax" id="GmaxBtn">GIGANTAMAX</button>
              </div>
            </div>

            <!-- stats -->
            <div class="rightSide">
              <PokemonStats :pokemon="pokemon" />
              <!-- description -->
              <PokedexEntry :text="pokedexEntry?.flavor_text ?? ''"/>
            </div>
          </div>
        </div>
      </aside>

      <!-- SEARCH -->

<PokemonSearch
  @filter="searchText = $event"
    :searchText="searchText"
  @search="searchPokemon"
/>    </section>

    <!-- RIGHT PANEL -->

    <section class="rightPanel">
<PokemonCarousel
  :pokemonList="filteredPokemonList"
  :searchText="searchText"
  :selectedPokemon="pokemon?.name ?? ''"
  @select="selectPokemon"
/>    <button class="exitButton">EXIT</button>
    </section>
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

.leftPanel{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.rightSide {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 1rem;
}

.topSection {
  display: grid;

  grid-template-columns:
    3fr
    2fr;

  gap: 1rem;

  min-height: 0;
}

.leftInfo {
  display: grid;

  grid-template-rows:
    auto
    1fr
    auto;

  gap: .8rem;

  min-height: 0;
}


.panelButtons {
  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:1rem;
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

.pokemonDetails {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.exitButton {
  justify-self: end;
  align-self: end;
  width: 120px;
  height: 60px;
  font-size: 1.3rem;
  cursor: pointer;
}

.pokecontainer {
  display: grid;

  grid-template-rows:
    auto      /* Pokemon title */
    1fr       /* Main section */
    auto;     /* Buttons */


  width: 100%;
  height: 100%;

  padding: 1.5rem;

  box-sizing: border-box;

  border: 4px solid black;
  background: #f7f1e7;

  overflow: auto;
}

.rightPanel {
  display: grid;
  grid-template-rows:
    1fr
    80px;

  gap: 1rem;
  min-height: 0;
  position: relative;
}

.pokemonDetails,
.pokecontainer,
.topSection,
.leftInfo,
.rightSide {
  min-height: 0;
}


@media (max-width: 1400px) {

  .overall{
        overflow-y: auto;

  }
  .topSection {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .rightSide {
    grid-template-rows:
      auto
      auto;
  }

}

@media (max-width: 1100px) {

  .overall {

    grid-template-columns: 1fr;

    grid-template-rows:
      auto
      auto;

    height: auto;

    overflow-y: auto;
  }

  .rightPanel {

    height: 650px;
  }

}
</style>
