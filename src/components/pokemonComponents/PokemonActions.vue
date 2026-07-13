<script setup lang="ts">
const emit = defineEmits<{
  (e: "evolve"): void;
  (e: "mega"): void;
  (e: "gigantamax"): void;
}>();
</script>

<template>
  <div class="panelButtons">
    <button id="EvolveBtn" @click="emit('evolve')">EVOLVE</button>

    <button id="MegaBtn" @click="emit('mega')">MEGA EVOLVE</button>

    <button id="GmaxBtn" @click="emit('gigantamax')">GIGANTAMAX</button>
  </div>
</template>

<style scoped>
* {
  font-family: "Pokefont";
  font-size: 1.5rem;
}
.panelButtons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 1rem;
}

.panelButtons button {
  margin-top: 1rem;
  padding: 1rem;

  border: 4px solid black;
  border-radius: 10px;

  background-color: rgb(184, 104, 208);

  color: white;

  text-shadow:
    2px 2px 0 rgb(112, 112, 112),
    3px 3px 0 rgb(112, 112, 112),
    4px 4px 3px rgb(112, 112, 112);

  cursor: pointer;
}

.panelButtons button:hover {
  background-color: rgb(222, 128, 251);
}

#GmaxBtn {
  background-color: rgb(144, 47, 47);
}

#GmaxBtn:hover {
  background-color: rgb(212, 69, 69);
}

#EvolveBtn {
  background-color: rgb(55, 137, 209);
}

#EvolveBtn:hover {
  background-color: rgb(71, 167, 250);
}
</style>
