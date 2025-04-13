import { useEffect, useRef } from 'react'
import { SOUNDS } from '../configs/sounds'

export const useSound = () => {
  const sounds = useRef({})

  useEffect(() => {
    Object.entries(SOUNDS).forEach(([key, url]) => {
      sounds.current[key] = new Audio(url)
    })

    return () => {
      Object.values(sounds.current).forEach(sound => {
        sound.pause()
        sound.currentTime = 0
      })
    }
  }, [])

  const playSound = (soundKey) => {
    const sound = sounds.current[soundKey]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(error => {
        console.error('Error playing sound:', error)
      })
    }
  }

  return {
    playCorrectPlacement: () => playSound('CORRECT_PLACEMENT'),
    playWrongPlacement: () => playSound('WRONG_PLACEMENT'),
    playDrag: () => playSound('DRAG')
  }
} 