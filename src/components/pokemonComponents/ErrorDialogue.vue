<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  show: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const displayedText = ref("");
const isTyping = ref(false);

let typingInterval: number | undefined;

function closeDialogue() {
  if (isTyping.value) return;

  emit("close");
}

watch(
  () => props.show,
  (show) => {
    if (!show) {
      displayedText.value = "";

      if (typingInterval) {
        clearInterval(typingInterval);
      }

      return;
    }

    displayedText.value = "";
    isTyping.value = true;

    let index = 0;

    typingInterval = window.setInterval(() => {
      displayedText.value += props.message[index];

      index++;

      if (index >= props.message.length) {
        clearInterval(typingInterval);

        isTyping.value = false;
      }
    }, 30);
  },
);
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="overlay" @click.self="closeDialogue">
      <div class="dialogueBox">
        <img
          src="@/assets/sprites/error/ProfessorSprite.png"
          alt="Professor Oak"
          class="oakSprite"
        />

        <div class="dialogueContent">
          <h2>PROFESSOR BIRCH</h2>

          <p>
            There's a time and place for everything! Unfortunately,
            {{ displayedText }}
          </p>

          <button v-if="!isTyping" class="okButton" @click="closeDialogue">
            OK
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.6);

  z-index: 9999;
}

.dialogueBox {
  display: flex;
  align-items: center;
  gap: 2rem;

  width: 750px;
  max-width: 90vw;

  padding: 2rem;

  border: 6px solid #1f1f1f;

  background: #f8f8f8;

  box-shadow:
    4px 0 #1f1f1f,
    -4px 0 #1f1f1f,
    0 4px #1f1f1f,
    0 -4px #1f1f1f;
}

.oakSprite {
  width: 220px;

  image-rendering: pixelated;

  flex-shrink: 0;
}

.dialogueContent {
  display: flex;
  flex-direction: column;

  gap: 1.5rem;

  flex: 1;
}

.dialogueContent h2 {
  margin: 0;

  font-size: 2.4rem;
}

.dialogueContent p {
  margin: 0;

  min-height: 120px;

  font-size: 1.6rem;

  line-height: 1.5;
}

.dialogueContent button {
  align-self: flex-end;

  width: 140px;
  height: 60px;

  border: 4px solid black;

  background: rgb(55, 137, 209);

  color: white;

  font-size: 1.4rem;

  cursor: pointer;
}

.dialogueContent button:hover {
  background: rgb(71, 167, 250);
}

.okButton {
  font-family: "Pokefont";
  gap: 0.5rem;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
