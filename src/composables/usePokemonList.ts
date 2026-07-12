import { ref, computed } from "vue";
import type { PokemonListItem } from "@/interface/pokemonInterface.ts";

const pokemonList = ref<PokemonListItem[]>([]);
const searchText = ref("");

export function usePokemonList() {
  async function loadPokemonList() {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1025"
    );

    const data = await response.json();

    pokemonList.value = data.results.map(
      (pokemon: PokemonListItem, index: number) => ({
        id: index + 1,
        name: pokemon.name,
        url: pokemon.url,
      })
    );
  }

  const filteredPokemonList = computed(() => {
    if (!searchText.value) {
      return pokemonList.value;
    }

    return pokemonList.value.filter((pokemon) =>
      pokemon.name.startsWith(searchText.value.toLowerCase())
    );
  });

  return {
    pokemonList,
    searchText,
    filteredPokemonList,
    loadPokemonList,
  };
}