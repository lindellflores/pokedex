<script setup lang="ts">
import { computed } from "vue";
import type { Pokemon } from "@/interface/pokemonInterface";
import type { PokemonSpecies } from "@/interface/pokemonInterface.ts";
import formatName from "../helpers/formatName";
import normalizeSprite from "@/components/helpers/normalizeSpriteName";
import TypeBadge from "./typeBadges.vue";
// import favorite from "@/assets/pokemonPage/star.png";
import {
  getBackgroundClass,
  isPokemonType,
  normalbg,
} from "@/components/helpers/TypeBackground.ts";

import sparkle from "@/assets/pokemonPage/sparkle.png";

const props = defineProps<{
  pokemon: Pokemon;
  species: PokemonSpecies | null;
  isEvolving: boolean;
  isFlashing: boolean;
  isPulsing: boolean;
  isShaking: boolean;
  isSparkling: boolean;
}>();

const spriteBackground = computed(() => {
  const firstType = props.pokemon.types[0]?.type.name;
  const secondType = props.pokemon.types[1]?.type.name;

  if (firstType && isPokemonType(firstType)) {
    return getBackgroundClass(firstType);
  }

  if (secondType && isPokemonType(secondType)) {
    return getBackgroundClass(secondType);
  }

  return normalbg;
});

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
  <div class="pokemonInfo">
    <!-- Dark Overlay -->
    <div v-if="isEvolving" class="evolutionOverlay" />

    <!-- Name -->
    <div class="PokemonMain">
      <div class="pokemonHeader">
        No.{{ pokemon.id.toString().padStart(3, "0") }}
        &nbsp;:&nbsp;
        {{ formatName(pokemon.name) }}
      </div>

      <div class="pokemonBody">
        The
        {{ species?.genera.find((g) => g.language.name === "en")?.genus }}
      </div>
    </div>

    <!-- Sprite -->
    <div class="spriteWithFavorite">
      <div
        :key="pokemon.id"
        class="sprite"
        :class="{ evolving: isEvolving }"
        :style="{
          backgroundImage: `url(${spriteBackground})`,
          imageRendering: 'pixelated',
        }"
      >
        <!-- Evolution Rings -->
        <div v-if="isEvolving" class="ring ring1" />

        <div v-if="isEvolving" class="ring ring2" />

        <div v-if="isEvolving" class="ring ring3" />

        <!-- Sparkles -->
        <img
          v-for="i in 5"
          :key="i"
          v-if="isSparkling"
          :src="sparkle"
          :class="['sparkle', `sparkle${i}`]"
        />

        <!-- Shake -->
        <div :class="{ shakeSprite: isShaking }">
          <!-- Flash -->
          <div :class="{ flashSprite: isFlashing }">
            <!-- Pulse -->
            <img
              v-if="sprite.includes('play.pokemonshowdown.com')"
              :src="sprite"
              class="showdown-sprite"
              :class="{ pulsing: isPulsing }"
            />

            <img
              v-else
              :src="sprite"
              class="normal-sprite"
              :class="{ pulsing: isPulsing }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Types + Ability -->
    <div class="secondRow">
      <div class="types">
        <div class="boxHeader">TYPE</div>

        <div class="boxBody">
          <div class="typeimg">
            <TypeBadge
              v-for="type in pokemon.types"
              :key="type.slot"
              :type="type.type.name"
            />
          </div>
        </div>
      </div>

      <div class="abilities">
        <div class="boxHeader">ABILITY</div>

        <div class="boxBody">
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
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: "PokeFonts";
  src: url("./assets/fonts/pokemonbw.otf");
}

body {
  font-family: "PokeFonts", sans-serif;
}

.pokemonInfo {
  position: relative;
}

.evolutionOverlay {
  position: absolute;

  inset: 0;

  background: black;

  opacity: 0.85;

  z-index: 900;

  animation: fadeIn 0.35s forwards;

  pointer-events: none;
}

.PokemonMain {
  border: 2px solid rgb(96, 176, 136);
  margin-bottom: 1rem;
  background: white;
}

.pokemonHeader {
  background: rgb(96, 176, 136);
  color: white;

  text-align: center;

  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow:
    2px 2px 0 #3d6b4f,
    3px 3px 0 #2b4a36,
    4px 4px 3px rgba(0, 0, 0, 0.25);

  padding-top: 5px;
  padding-bottom: 2px;
}

.pokemonBody {
  text-align: center;
  font-size: 1.5rem;
  padding-bottom: 5px;
}

.sprite.evolving {
  position: relative;

  z-index: 1000;

  box-shadow:
    0 0 40px white,
    0 0 80px #7dd3ff,
    0 0 120px white;
}

.ring {
  position: absolute;

  border: 8px solid white;
  border-radius: 50%;

  opacity: 0;

  animation: ring 1.2s linear infinite;
}

.ring1 {
  width: 160px;
  height: 160px;
}

.ring2 {
  width: 220px;
  height: 220px;
  animation-delay: 0.3s;
}

.ring3 {
  width: 280px;
  height: 280px;
  animation-delay: 0.6s;
}
.normal-sprite.pulsing {
  animation: pulse 0.55s ease-in-out infinite;
}

.showdown-sprite.pulsing {
  animation: pulseShowdown 0.55s ease-in-out infinite;
}

.shakeSprite {
  animation: shake 0.12s linear infinite;
}

.flashSprite {
  animation: flash 0.28s linear infinite;
}

.sprite {
  position: relative;

  display: flex;

  justify-content: center;

  align-items: center;

  overflow: visible;

  background-size: cover;
  background-position: center;

  height: 270px;

  border: 2px solid rgb(96, 176, 136);
}

.sprite::before {
  content: "";

  position: absolute;
  inset: 0;

  background: black;

  opacity: 0;

  transition: opacity 0.5s ease;

  pointer-events: none;
}

.sprite.evolving::before {
  opacity: 0.9;
}

.normal-sprite {
  max-width: 100%;
  max-height: 100%;

  transform: scale(2.4);

  image-rendering: pixelated;
}
.showdown-sprite {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  transform: scale(1.5);

  image-rendering: pixelated;
}

.favorite {
}

.secondRow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.types,
.abilities {
  border: 2px solid rgb(96, 176, 136);
  background: white;
  display: flex;
  flex-direction: column;
}

.boxHeader {
  background: rgb(96, 176, 136);
  color: white;

  text-align: center;

  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 2px;

  padding: 0.2rem;

  text-shadow:
    1px 1px 0 rgb(112, 112, 112),
    2px 2px 0 rgb(112, 112, 112);
}

.boxBody {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.typeimg {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
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

.abilitylist p {
  margin: 0;
  text-transform: capitalize;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.85;
  }
}

@keyframes ring {
  0% {
    transform: scale(0.5) rotate(0deg);

    opacity: 1;
  }

  100% {
    transform: scale(1.8) rotate(180deg);

    opacity: 0;
  }
}

@keyframes flash {
  0% {
    filter: brightness(1);
  }

  25% {
    filter: brightness(4) drop-shadow(0 0 30px rgb(201, 201, 201));
  }

  50% {
    filter: brightness(5) hue-rotate(180deg);
  }

  75% {
    filter: brightness(4) drop-shadow(0 0 30px rgb(31, 87, 255));
  }

  100% {
    filter: brightness(1);
  }
}

@keyframes shake {
  0% {
    transform: scale(1) translateX(-3px);
  }
  25% {
    transform: scale(1) translateX(3px);
  }
  50% {
    transform: scale(1) translateY(-3px);
  }
  75% {
    transform: scale(1) translateY(3px);
  }
  100% {
    transform: scale(1) translateX(-3px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(2.4);
  }

  50% {
    transform: scale(2.6);
  }

  100% {
    transform: scale(2.4);
  }
}

@keyframes pulseShowdown {
  0% {
    transform: scale(2);
  }

  50% {
    transform: scale(2.08);
  }

  100% {
    transform: scale(2);
  }
}

.sparkle {
  position: absolute;

  width: 42px;

  pointer-events: none;

  animation: sparkle 1.5s ease-out forwards;

  z-index: 1500;
}

.sparkle1 {
  top: 15%;

  left: 18%;
}

.sparkle2 {
  top: 20%;

  right: 18%;

  animation-delay: 0.2s;
}

.sparkle3 {
  bottom: 22%;

  left: 20%;

  animation-delay: 0.35s;
}

.sparkle4 {
  bottom: 15%;

  right: 18%;

  animation-delay: 0.5s;
}

.sparkle5 {
  top: 50%;

  left: 50%;

  transform: translate(-50%, -50%);

  animation-delay: 0.15s;
}

@keyframes sparkle {
  0% {
    opacity: 0;

    transform: scale(0.2) rotate(0deg);
  }

  25% {
    opacity: 1;
  }

  100% {
    opacity: 0;

    transform: scale(1.4) rotate(180deg);
  }
}
</style>
