<script setup lang="ts">
import fire from '@/assets/types/fireType.png'
import water from '@/assets/types/waterType.png'
import grass from '@/assets/types/grassType.png'
import electric from '@/assets/types/electricType.png'
import normal from '@/assets/types/normalType.png'
import bug from '@/assets/types/bugType.png'
import dark from '@/assets/types/darkType.png'
import dragon from '@/assets/types/dragonType.png'
import fairy from '@/assets/types/fairyType.png'
import fighting from '@/assets/types/fightingType.png'
import flying from '@/assets/types/flyingType.png'
import ghost from '@/assets/types/ghostType.png'
import ice from '@/assets/types/iceType.png'
import ground from '@/assets/types/groundType.png'
import poison from '@/assets/types/poisonType.png'
import psychic from '@/assets/types/psychicType.png'
import rock from '@/assets/types/rockType.png'
import steel from '@/assets/types/steelType.png'

const {type} = defineProps<{
    type: string
}>()

const typeBadges: Record<string, string> = {
  fire,
  water,
  grass,
  electric,
  normal,
  bug,
  dark,
  dragon,
  fairy,
  fighting,
  flying,
  ghost,
  ice,
  ground,
  poison,
  psychic,
  rock,
  steel
}   
</script>

<template>
  <img
    :src="typeBadges[type]"
    :alt="type"
    class="type-badge"
  />
</template>


<style scoped>
.type-badge {
  width: 100%;
  max-width: 10rem;
  height: auto;
  image-rendering: pixelated;
}
</style>