<script setup lang="ts">
import { computed } from "vue";
import TypeBadge from "./typeBadges.vue";

import type { Pokemon } from "@/interface/pokemonInterface";
import type { PokemonSpecies } from "@/interface/pokemonSpeciesInt";

import formatName from "@/components/helpers/formatName";
import normalizeSprite from "@/components/helpers/normalizeSpriteName";

const props = defineProps<{
  pokemon: Pokemon;
  species: PokemonSpecies | null;
}>();

const sprite = computed(() => {
  const name = normalizeSprite(props.pokemon.name);

  return (
    props.pokemon.sprites.versions["generation-v"]["black-white"].animated
      ?.front_default ??
    `https://play.pokemonshowdown.com/sprites/ani/${name}.gif`
  );
});
</script>

<template>
    <!-- Name -->
    <div class="PokemonMain">
      <span class="pokename">
        No.{{ pokemon.id.toString().padStart(3, "0") }}
        -
        {{ formatName(pokemon.name) }}
      </span>

      <p class="genus">
        The
        {{ species?.genera.find((g) => g.language.name === "en")?.genus }}
      </p>
    </div>

    <!-- Sprite -->
    <div class="sprite">
      <img
        v-if="sprite.includes('play.pokemonshowdown.com')"
        :src="sprite"
        class="showdown-sprite"
      />

      <img
        v-else
        :src="sprite"
        class="normal-sprite"
      />
    </div>

    <!-- Types + Ability -->
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

.sprite {
  border: 2px solid #cfc8bb;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-image: url("@/assets/background.jpg");
}

.normal-sprite {
  max-width:100%;
  max-height:100%;

  transform:scale(2.4);

  image-rendering:pixelated;
}
.showdown-sprite {
  height: 100%;
  width: auto;
  image-rendering: pixelated;
}

.sprite {
  min-height:270px;
  display: flex;
  justify-content: center;
  align-items: center;
  background:url("@/assets/background.jpg");

}

.secondRow {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
}

.secondRow {
  border: 2px solid #cfc8bb;
  border-radius: 6px;
  background: white;
  padding: 1rem;
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

</style>