// src/composables/useMusic.ts

const playlist = [
  '/songs/route101Theme.mp3',
  '/songs/petalburgTheme.mp3',
  '/songs/route104Theme.mp3',
]

const audio = new Audio()
let initialized = false
let current = 0

export function useMusic() {
  function init() {
    if (initialized) return
    initialized = true

    audio.src = playlist[current]!
    audio.volume = 0.4

    audio.addEventListener('ended', () => {
      current = (current + 1) % playlist.length
      audio.src = playlist[current]!
      audio.play()
    })
  }

  function play() {
    init()

    if (audio.paused) {
      audio.play().catch(console.error)
    }
  }

  function pause() {
    audio.pause()
  }

  return {
    play,
    pause,
  }
}
