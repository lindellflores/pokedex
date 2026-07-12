// src/composables/useMusic.ts

import evolutionSuccess from "@/assets/sounds/evolutionSuccess.mp3"

const playlist = [
  "/songs/route101Theme.mp3",
  "/songs/petalburgTheme.mp3",
  "/songs/route104Theme.mp3",
]

const bgm = new Audio()
const evolution = new Audio("/songs/evolution.mp3")
const evolutionComplete = new Audio(evolutionSuccess)

let initialized = false
let current = 0

export function useMusic() {
  function init() {
    if (initialized) return

    initialized = true

    bgm.src = playlist[current]!
    bgm.volume = 0.4

    bgm.addEventListener("ended", () => {
      current = (current + 1) % playlist.length
      bgm.src = playlist[current]!
      bgm.play()
    })
  }

  function play() {
    init()

    if (bgm.paused) {
      bgm.play().catch(console.error)
    }
  }

  function pause() {
    bgm.pause()
  }

  function resume() {
    bgm.play().catch(console.error)
  }

  function playEvolution() {
    evolution.currentTime = 0
    evolution.play()
  }

  function stopEvolution() {
    evolution.pause()
    evolution.currentTime = 0
  }

  function playEvolutionComplete() {
    evolutionComplete.currentTime = 0
    evolutionComplete.play()
  }

  return {
    play,
    pause,
    resume,
    playEvolution,
    stopEvolution,
    playEvolutionComplete,
  }
}