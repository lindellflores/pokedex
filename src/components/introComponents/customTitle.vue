<template>
  <div class="title-screen">
    <img :src="logo" class="logo" />
    <div class="press-start">PRESS START</div>
    <div class="welcome">
      A PokeAPI Pokedex Project
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/intro/emerald-logo.png";
</script>

<style scoped>
.title-screen { 
position: absolute; 
inset: 0; 
display: flex; 
flex-direction: column; 
justify-content: center; 
align-items: center; 
gap: 8rem; 
text-align: center; 
} 

.logo {
width: 600px;
 max-width: 90%; 
margin-right: 2rem; 
margin-bottom: 5rem; 
transform: scale(1.9); 
} 

.press-start { 
color: white; 
font-size: 3rem; 
font-weight: 1000; 
letter-spacing: 0.1em; 
text-align: center; 
user-select: none; 
transform: scaleX(2.5);
text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000; 

margin-top: 3rem; 
margin-left: 2rem; 
animation: blink 2s infinite; 
}

.welcome { 
margin-bottom: -5rem; 
margin-left: 2rem; 
color: white; 
font-size: 2rem; 
font-weight: 1000; 
letter-spacing: 0.1em; 
text-align: center; 
user-select: none; 
text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000; 
} 

@keyframes blink { 
50% { opacity: 0;} 
} 
</style>