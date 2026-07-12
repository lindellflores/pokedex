<script setup lang="ts">
import "@/assets/main.css";

import { useRouter } from "vue-router";
import dingSound from "@/assets/sounds/A-effect.m4a";

const ding = new Audio(dingSound);

const router = useRouter();

function pushPokedex() {
  ding.play()
  router.push("/pokemon/bulbasaur");
}

function pushBattle() {
  ding.play()
  
  router.push("/battle");
  
}
</script>

<template>
  <div class="overall">

    <div class="battle-block">
      <button @click="pushBattle" id="btlBtn">CONTINUE</button>
    </div>

    <div class="pokedex-block">
      <button @click="pushPokedex" id="dexBtn">POKéDEX</button>
    </div>
<div class="spriteLayer">
    <div class="mewRunner">
  <div class="mew">
    <img src="@/assets/sprites/running/mew/mew1.png" class="mewFrame mewFrame1" />
    <img src="@/assets/sprites/running/mew/mew2.png" class="mewFrame mewFrame2" />
  </div>
</div>

    <div class="truck">
  <img src="@/assets/sprites/running/truck.png">
</div>

   <div class="runner runner1">
  <img src="@/assets/sprites/running/maleProtag/maleRun1.png" class="frame frame1" />
  <img src="@/assets/sprites/running/maleProtag/maleRun2.png" class="frame frame2" />
  <img src="@/assets/sprites/running/maleProtag/maleRun3.png" class="frame frame3" />
</div>

<div class="runner runner2">
  <img src="@/assets/sprites/running/femaleProtag/femaleRun1.png" class="frame frame1" />
  <img src="@/assets/sprites/running/femaleProtag/femaleRun2.png" class="frame frame2" />
  <img src="@/assets/sprites/running/femaleProtag/femaleRun3.png" class="frame frame3" />
</div>

<div class="runner vigoroth1">
  <img src="@/assets/sprites/running/vigoroth/vigo1.png" class="frame frame1" />
  <img src="@/assets/sprites/running/vigoroth/vigo2.png" class="frame frame2" />
  <img src="@/assets/sprites/running/vigoroth/vigo3.png" class="frame frame3" />
</div>
  </div>


  </div>
</template>

<style scoped>

@font-face {
  font-family: "PokeFont";
  src: url("./assets/fonts/pokemon-emerald.otf");
}
.overall{
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("@/assets/baackground/homebg.png");
   background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  scrollbar-width: none;
}

.battle-block button,
.pokedex-block button{
  font-size: 3rem;
  font-family: "PokeFont", sans-serif;
  color:rgb(60, 59, 59);
  text-shadow:
    1px 1px 0 rgb(208,208,200),
    2px 2px 0 rgb(208,208,200);

  display: flex;
  align-content: flex-start;

  
  width: 95vw;
  height: 20vh;
  border: 8px solid #1f1f1f;
  margin: 1rem;
  padding: 1.5rem;
  

  box-shadow:
    8px 0 #1f1f1f,
   -8px 0 #1f1f1f,
    0 8px #1f1f1f,
    0 -8px #1f1f1f;

  background-color: rgb(194, 193, 192);
}

.battle-block button{
  margin-top: 2rem;
}

#btlBtn:hover,
#dexBtn:hover{
    background-color: rgb(251, 248, 245);

}
.spriteLayer {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.mewRunner {
    position: absolute;
    bottom: 50vh;
    right: -520px;

    animation: runAcross 8s linear -8s infinite;
}

.mew {
    position: relative;
    width: 40px;

    animation: mewFloat 1.8s ease-in-out infinite;
}

.mewFrame {
    position: absolute;
    inset: 0;

    width: 100%;

    image-rendering: pixelated;
    transform: scale();

}

.mewFrame1 {
    animation: mewFrame1 .25s steps(1) infinite;
}

.mewFrame2 {
    animation: mewFrame2 .25s steps(1) infinite;
}

.runner,
.truck {
    position: absolute;
}

.truck {
    width: 120px;
    bottom: 20vh;
    right: -400px;
    animation: runAcross 7s linear -7s infinite;
    z-index: 8;

}

.runner {
  bottom: 5vh;
    width: 96px;
    height: 96px;

}

.runner1 {
    right: -750px;
    z-index: 4;
        animation: runAcross 8s linear -8s infinite;

    /* border: 2px red solid */
}

.runner2 {
    right: -850px;
        z-index: 4;
            animation: runAcross 8s linear -8s infinite;

        /* border: 2px rgb(71, 238, 5) solid */

}

.vigoroth1 {
    bottom: -30px;
    z-index: 10;
        animation: runAcross 30s linear -4s infinite;

    /* border: 2px rgb(2, 255, 221) solid */
    right: -900px;
}

.vigoroth1 img {
    transform: scale(3.8);
}




.runner img,
.truck img {
    position: absolute;
    image-rendering: pixelated;
}

.runner img {
    inset: 0;
    transform: scale(4);
}

.truck img {
    width: 100%;
    transform: scale(1.5);
}

.vigoroth .frame1 {
  animation: frame1 .60s steps(1) infinite;
}

.vigoroth .frame2 {
  animation: frame2 .60s steps(1) infinite;
}

.vigoroth .frame3 {
  animation: frame3 .60s steps(1) infinite;
}

.frame1 {
    animation: frame1 .35s steps(1) infinite;
}

.frame2 {
    animation: frame2 .35s steps(1) infinite;
}

.frame3 {
    animation: frame3 .35s steps(1) infinite;
}

@keyframes frame1 {

    0%,33% {
        opacity:1;
    }

    34%,100% {
        opacity:0;
    }

}

@keyframes frame2 {

    0%,33% {
        opacity:0;
    }

    34%,66% {
        opacity:1;
    }

    67%,100% {
        opacity:0;
    }

}

@keyframes frame3 {

    0%,66% {
        opacity:0;
    }

    67%,100% {
        opacity:1;
    }

}

@keyframes runAcross {

    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(calc(-100vw - 900px));
    }

}

@keyframes mewFrame1 {
    0%, 49% {
        opacity: 1;
    }

    50%, 100% {
        opacity: 0;
    }
}

@keyframes mewFrame2 {
    0%, 49% {
        opacity: 0;
    }

    50%, 100% {
        opacity: 1;
    }
}

@keyframes mewFloat {

    0% {
        transform: translate(0, 0) rotate(-5deg);
    }

    25% {
        transform: translate(5px, -8px) rotate(3deg);
    }

    50% {
        transform: translate(0, -14px) rotate(-2deg);
    }

    75% {
        transform: translate(-4px, -8px) rotate(4deg);
    }

    100% {
        transform: translate(0, 0) rotate(-5deg);
    }
}
@media (max-width: 1800px) {
    .spriteLayer {
        transform: scale(.9);
        transform-origin: bottom center;
    }
}

@media (max-width: 1600px) {
    .spriteLayer {
        transform: scale(.8);
    }
}

@media (max-width: 1400px) {
    .spriteLayer {
        transform: scale(.7);
    }
}

@media (max-width: 1100px) {
    .spriteLayer {
        transform: scale(.55);
    }
}
</style>
