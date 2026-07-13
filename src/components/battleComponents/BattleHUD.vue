<script setup lang="ts"></script>

<template>
  <div class="hudLayer">
    <!-- Enemy -->
    <div class="enemyHud">
      <div class="topRow">
        <span class="pokemonName">RAYQUAZA</span>
        <span class="level">Lv70</span>
      </div>

      <div class="hpSection">
        <span class="hpLabel">HP</span>

        <div class="hpBar">
          <div class="hpFill"></div>
        </div>
      </div>
    </div>

    <!-- Player -->
    <div class="playerHud">
      <div class="topRow">
        <span class="pokemonName">SCEPTILE ♂</span>
        <span class="level">Lv70</span>
      </div>

      <div class="hpSection">
        <span class="hpLabel">HP</span>

        <div class="hpBar">
          <div class="hpFill"></div>
        </div>
      </div>

      <div class="bottomRow">
        <span class="hpNumbers">198 / 198</span>

        <div class="expBar">
          <div class="expFill"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hudLayer {
  position: absolute;
  inset: 0;

  pointer-events: none;
  z-index: 50;
}

.enemyHud {
  position: absolute;

  top: 105px;
  left: 140px;
  height: 120px;

  width: 420px;

  padding: 18px 24px;

  background: wheat;

  border: 2px solid #2c2c2c;

  box-shadow:
    8px 0 #1f1f1f,
    -8px 0 #1f1f1f,
    0 8px #1f1f1f,
    0 -8px #1f1f1f;
  transform: translateX(-1000px);

  animation: enemyHudSlide 0.4s ease-out forwards;
}

.playerHud {
  position: absolute;

  right: 120px;
  bottom: 205px;

  width: 470px;

  padding: 18px 24px;

  background: wheat;

  border: 2px solid #2c2c2c;
  border-radius: px;

  box-shadow:
    8px 0 #1f1f1f,
    -8px 0 #1f1f1f,
    0 8px #1f1f1f,
    0 -8px #1f1f1f;
  transform: translateX(1000px);

  animation: playerHudSlide 0.4s ease-out forwards;
  animation-delay: 0.45s;
}

.topRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottomRow {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 14px;
}

.pokemonName {
  font-size: 2.5rem;
  font-weight: bold;

  letter-spacing: 2px;
}

.level {
  font-size: 2rem;
}

.hpNumbers {
  font-size: 2rem;
}

.hpSection {
  display: flex;
  align-items: center;

  margin-top: 12px;

  gap: 12px;
}

.hpLabel {
  font-weight: bold;

  font-size: 1rem;
}

.hpBar {
  flex: 1;

  height: 16px;

  background: #444;
  border: 2px solid grey;

  overflow: hidden;
}

.hpFill {
  width: 100%;
  height: 100%;

  background: linear-gradient(to right, #287c28, #57a53d, #287c28);
}

.expBar {
  width: 180px;

  height: 8px;

  background: #888;
  border: 2px solid grey;

  overflow: hidden;
}

.expFill {
  width: 72%;
  height: 100%;

  background: deepskyblue;
}

@keyframes enemyHudSlide {
  from {
    transform: translateX(-1000px);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes playerHudSlide {
  from {
    transform: translateX(1000px);
  }

  to {
    transform: translateX(0);
  }
}
</style>
