import { ref, type Ref } from "vue";
import type { Router } from "vue-router";

import type { Pokemon, PokemonSpecies } from "@/interface/pokemonInterface";

export function useEvolution(
  pokemon: Ref<Pokemon | null>,
  species: Ref<PokemonSpecies | null>,
  router: Router,
  loadPokemon: (name: string) => Promise<void>,
  music: {
    pause: () => void;
    resume: () => void;
    playEvolution: () => void;
    stopEvolution: () => void;
    playEvolutionComplete: () => void;
  },
) {
  const isEvolving = ref(false);
  const isFlashing = ref(false);
  const isPulsing = ref(false);
  const isShaking = ref(false);
  const isSparkling = ref(false);

  const id = Math.random().toString(36).slice(2, 7);

  console.log("Evolution instance:", id);
  console.log(id, "starting evolution");
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function evolve(): Promise<string | null> {
    if (!species.value || !pokemon.value) {
      return "No Pokémon is currently loaded.";
    }

    const response = await fetch(species.value.evolution_chain.url);
    const evolutionData = await response.json();

    const chain = evolutionData.chain;

    let nextPokemon = "";

    if (
      chain.species.name === pokemon.value.name &&
      chain.evolves_to.length > 0
    ) {
      nextPokemon = chain.evolves_to[0].species.name;
    } else if (
      chain.evolves_to.length > 0 &&
      chain.evolves_to[0].species.name === pokemon.value.name &&
      chain.evolves_to[0].evolves_to.length > 0
    ) {
      nextPokemon = chain.evolves_to[0].evolves_to[0].species.name;
    }

    if (!nextPokemon) {
      return "This Pokémon cannot evolve.";
    }

    music.pause();
    music.playEvolution();

    isEvolving.value = true;

    await sleep(1000);
    isPulsing.value = true;

    await sleep(1000);
    isFlashing.value = true;

    await sleep(1000);
    isShaking.value = true;

    await sleep(6000);

    await router.push(`/pokemon/${nextPokemon}`);
    console.log(id, "after push");
    await loadPokemon(nextPokemon);

    isFlashing.value = false;
    isShaking.value = false;
    isPulsing.value = false;
    console.log("sparkle ON");

    isSparkling.value = true;

    music.stopEvolution();
    music.playEvolutionComplete();

    await sleep(1500);

    isSparkling.value = false;

    music.resume();

    isEvolving.value = false;

    return null;
  }

  return {
    evolve,
    isEvolving,
    isFlashing,
    isPulsing,
    isShaking,
    isSparkling,
  };
}
