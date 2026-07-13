import { nextTick, ref } from "vue";
import type { Pokemon, PokemonSpecies } from "@/interface/pokemonInterface.ts";
import normalizeName from "@/components/helpers/normalizeName";

const pokemon = ref<Pokemon | null>(null);
const species = ref<PokemonSpecies | null>(null);
const loading = ref(false);
const error = ref("");

export function usePokemon() {
  async function loadPokemon(name: string) {
    loading.value = true;
    error.value = "";

    try {
      const pokemonName = normalizeName(name);

      const pokemonResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
      );

      if (!pokemonResponse.ok) {
        throw new Error(`${pokemonName} not found`);
      }

      const fetchedPokemon: Pokemon = await pokemonResponse.json();

      console.log("pokemon assigned");
      pokemon.value = fetchedPokemon;

      await nextTick();

      new Audio(fetchedPokemon.cries.latest).play();

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

  return {
    pokemon,
    species,
    loading,
    error,
    loadPokemon,
  };
}
