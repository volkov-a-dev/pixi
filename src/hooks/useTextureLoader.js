import { useState, useEffect } from 'react'
import { Assets } from 'pixi.js'


export const useTextureLoader = ({TEXTURE_URLS}) => {
  const [loadedTextures, setLoadedTextures] = useState({})

  useEffect(() => {
    const loadTextures = async () => {
      const textures = {}
      for (const [key, url] of Object.entries(TEXTURE_URLS)) {
        try {
          textures[key] = await Assets.load(url)
        } catch (error) {
          console.error(`Failed to load texture ${key}:`, error)
        }
      }
      setLoadedTextures(textures)
    }
    loadTextures()
  }, [])

  return loadedTextures
} 