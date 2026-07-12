import type { Ref } from "vue";
import type { Router } from "vue-router";

import type { Pokemon, PokemonSpecies } from "@/interface/pokemonInterface";
import { gigantamaxMap } from "@/components/helpers/gigantamax";

export function usePokemonForms(
  pokemon: Ref<Pokemon | null>,
  species: Ref<PokemonSpecies | null>,
  router: Router,
) {
  function megaEvolve(): string | null {
    if (!species.value) {
      return "No Pokémon species data was loaded.";
    }

    const megaForms = species.value.varieties.filter((variety) =>
      variety.pokemon.name.includes("mega"),
    );

    if (megaForms.length === 0) {
      return "This Pokémon has no Mega Evolution.";
    }

    const megaForm = megaForms[0];

if (!megaForm) {
  return "This Pokémon has no Mega Evolution.";
}

router.push(`/pokemon/${megaForm.pokemon.name}`);

return null;
  }

  function gigantamax(): string | null {
    if (!pokemon.value) {
      return "No Pokémon is currently loaded.";
    }

    const gmax = gigantamaxMap[pokemon.value.name];

    if (!gmax) {
      return "This Pokémon cannot Gigantamax.";
    }

    router.push(`/pokemon/${gmax}`);

    return null;
  }

  return {
    megaEvolve,
    gigantamax,
  };
}