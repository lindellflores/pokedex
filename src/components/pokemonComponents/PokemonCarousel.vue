<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import type { PokemonListItem } from "@/interface/pokemonListItem";
import dingSound from "@/assets/sounds/A-effect.m4a";

const ding = new Audio(dingSound);
const props = defineProps<{
  pokemonList: PokemonListItem[];
  searchText: string;
  selectedPokemon: string

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

  const radius = 580;
  const spacing = 90;

  for (let offset = -HALF_WINDOW; offset <= HALF_WINDOW; offset++) {
    const index = selectedIndex.value + offset;

    if (index < 0 || index >= props.pokemonList.length) continue;

    const distance = Math.abs(offset);
    const y = offset * spacing;

    const clampedY = Math.max(-radius, Math.min(radius, y));

    const x = radius - Math.sqrt(radius * radius - clampedY * clampedY);

    const currentPokemon = props.pokemonList[index]!

items.push({
  pokemon: currentPokemon,

  id: currentPokemon.id,

  offset,

  x,

  y,

  opacity: 0.2 + 0.8 * Math.cos((distance / HALF_WINDOW) * (Math.PI / 2)),
  scale: 0.85 + 0.25 * Math.cos((distance / HALF_WINDOW) * (Math.PI / 2)),

  zIndex: 100 - distance,
})
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
  router.push(`/pokemon/${props.pokemonList[selectedIndex.value]!.name}`);
  playDing();
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
  playDing();
}

function onKeyDown(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowDown":
      if (selectedIndex.value < props.pokemonList.length - 1) {
        selectedIndex.value++;
        emit("select", props.pokemonList[selectedIndex.value]!);
      }
      playDing();
      break;

    case "ArrowUp":
      if (selectedIndex.value > 0) {
        selectedIndex.value--;
        emit("select", props.pokemonList[selectedIndex.value]!);
      }
      playDing();
      break;

    case "Enter":
      router.push(`/pokemon/${props.pokemonList[selectedIndex.value]!.name}`);
      playDing();
      break;
  }


}

const carouselRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  carouselRef.value?.focus();
});

watch(
  () => props.pokemonList,
  () => {
    selectedIndex.value = 0
  }
)

watch(
  () => props.selectedPokemon,
  (name) => {
    const index = props.pokemonList.findIndex(
      pokemon => pokemon.name === name
    )

    if (index !== -1) {
      selectedIndex.value = index
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
  v-if="pokemonList.length > 0"
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
        left: `${item.x + 40}px`,

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
 <div
  v-else
  class="noResults"
>
  <h2>No Pokémon Found</h2>

  <p>
    There are no results for
    <strong>"{{ searchText }}"</strong>
  </p>
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
    6.5rem
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

.listitem.selected{
  background-image: url("@/assets/dexList/dexlistsecondSelect.png");
}

.listitem.selected .pokemonIcon{
  animation-duration: 0.45s;
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

.noResults {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  color: white;

  gap: 1rem;
}

.noResults h2 {
  font-size: 2.4rem;
}

.noResults p {
  font-size: 1.5rem;
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
