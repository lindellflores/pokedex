<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { PokemonListItem } from "@/interface/pokemonListItem";
import dingSound from "@/assets/sounds/A-effect.m4a";

const ding = new Audio(dingSound);
const props = defineProps<{
  pokemonList: PokemonListItem[];
}>();

const router = useRouter();
const emit = defineEmits<{
  (e: "select", pokemon: PokemonListItem): void;
}>();

const WINDOW_SIZE = 11;
const HALF_WINDOW = Math.floor(WINDOW_SIZE / 2);
const selectedIndex = ref(0);

function playDing() {
  const sound = ding.cloneNode() as HTMLAudioElement;
  sound.play();
}

function getPokemonIcon(id: number) {
  if (id <= 898) {
    const generation = id <= 807 ? "generation-vii" : "generation-viii";

    return `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/versions/${generation}/icons/${id}.png`;
  }

  return `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/other/official-artwork/${id}.png`;
}
const visiblePokemon = computed(() => {
  const items: {
    pokemon: PokemonListItem;
    id: number;

    offset: number;

    x: number;
    y: number;

    opacity: number;
    scale: number;
    zIndex: number;
  }[] = [];

  if (!props.pokemonList.length) return items;

  const radius = 400;
  const spacing = 90;

  for (let offset = -HALF_WINDOW; offset <= HALF_WINDOW; offset++) {
    const index = selectedIndex.value + offset;

    if (index < 0 || index >= props.pokemonList.length) continue;

    const distance = Math.abs(offset);
    const y = offset * spacing;

    const clampedY = Math.max(-radius, Math.min(radius, y));

    const x = radius - Math.sqrt(radius * radius - clampedY * clampedY);

    items.push({
      pokemon: props.pokemonList[index]!,

      id: index + 1,

      offset,

      x,

      y,

      opacity: 0.2 + 0.8 * Math.cos((distance / HALF_WINDOW) * (Math.PI / 2)),
      scale: 0.85 + 0.25 * Math.cos((distance / HALF_WINDOW) * (Math.PI / 2)),

      zIndex: 100 - distance,
    });
  }

  return items;
});

function selectPokemon(index: number) {
  selectedIndex.value = index;

  emit("select", props.pokemonList[index]!);
}

function clickPokemon(offset: number) {
  let index = selectedIndex.value + offset;

  while (index < 0) index += props.pokemonList.length;

  while (index >= props.pokemonList.length) index -= props.pokemonList.length;

  selectPokemon(index);
}

function onWheel(event: WheelEvent) {
  event.preventDefault();

  if (event.deltaY > 0) {
    if (selectedIndex.value >= props.pokemonList.length - 1) return;

    selectedIndex.value++;
  } else {
    if (selectedIndex.value <= 0) return;

    selectedIndex.value--;
  }

  emit("select", props.pokemonList[selectedIndex.value]!);
}

function onKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowDown":
      if (selectedIndex.value < props.pokemonList.length - 1) {
        selectedIndex.value++;
        emit("select", props.pokemonList[selectedIndex.value]!);
      }
      break;

    case "ArrowUp":
      if (selectedIndex.value > 0) {
        selectedIndex.value--;
        emit("select", props.pokemonList[selectedIndex.value]!);
      }
      break;

    case "Enter":
      router.push(`/pokemon/${props.pokemonList[selectedIndex.value]!.name}`);
      break;
  }

  playDing();
}

const carouselRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  carouselRef.value?.focus();
});
</script>

<template>
  <div
    class="carousel"
    @wheel.prevent="onWheel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <div
      v-for="item in visiblePokemon"
      :class="{
        selected: item.offset === 0,
      }"
      :key="item.id"
      class="listitem"
      :style="{
        left: `${item.x + 60}px`,

        top: `calc(50% + ${item.y}px)`,

        opacity: item.opacity,

        zIndex: item.zIndex,

        transform: `

translateY(-50%)

scale(${item.scale})

`,
      }"
      @click="clickPokemon(item.offset)"
    >
      <img class="pokemonIcon" :src="getPokemonIcon(item.id)" />

      <span class="dexNumber">
        {{ String(item.id).padStart(3, "0") }}
      </span>

      <span class="pokemonName">
        {{ item.pokemon.name.toUpperCase() }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  outline: none;
  width: 100%;

  height: 100%;

  overflow: hidden;

  user-select: none;
}

.listitem {
  position: absolute;

  left: 0;

  transform: translateY(-50%);

  width: 100%;

  height: 3.8rem;

  display: grid;

  grid-template-columns:
    6rem
    60px
    1fr;

  align-items: center;

  padding: 0.5rem;

  background-image: url("@/assets/dexList/dexlistsecond.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  transition:
    transform 0.25s,
    top 0.25s,
    opacity 0.25s;
}

.listitem.selected,
.listitem:hover {
  background-image: url("@/assets/dexList/dexlistsecondSelect.png");
}

.dexNumber {
  color: white;
  opacity: 0.85;
  font-size: 1.3rem;
}

.pokemonName {
  color: white;
  letter-spacing: 2px;
  white-space: nowrap;
}

.pokemonIcon {
  width: 3rem;
  height: 40px;
  image-rendering: pixelated;
  animation: bob 1s infinite alternate;
}

.listitem:hover .pokemonIcon {
  animation-duration: 0.45s;
}

@keyframes bob {
  0%,
  100% {
    transform: scale(2) translateY(0);
  }

  50% {
    transform: scale(2) translateY(-4px);
  }
}
</style>
