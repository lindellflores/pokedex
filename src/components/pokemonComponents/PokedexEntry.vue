<script setup lang="ts">
import formatFlavorText from "@/components/helpers/formatText";

defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="pokedex">
    <div>
      {{ formatFlavorText(text) }}
    </div>
  </div>
</template>

<style scoped>
.pokedex {
  border: 2px solid rgb(96, 176, 136);
  background: white;

  padding: 1rem;

  flex: 1;
  min-height: 0;
  font-size: 1.8rem;
}

.pokedex > div {
  line-height: 2rem;
}
</style>
