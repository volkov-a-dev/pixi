import { useState, useEffect } from 'react'
import { CARDS, TARGETS_CARDS, CARD_WIDTH, CARD_HEIGHT, TARGET_SIZE } from '../constants/index'

export const useGameState = (loadedTextures) => {
  const [cards, setCards] = useState([])
  const [targets, setTargets] = useState([])
  const [draggedCard, setDraggedCard] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (Object.keys(loadedTextures).length === 0) return

    const initialCards = CARDS.map((suit, index) => ({
      id: `card-${index}`,
      suit,
      x: 50 + index * (CARD_WIDTH + 20),
      y: 50,
      originalX: 50 + index * (CARD_WIDTH + 20),
      originalY: 50,
      isPlaced: false
    }))

    const initialTargets = TARGETS_CARDS.map((suit, index) => ({
      id: `target-${index}`,
      suit,
      x: 50 + index * (TARGET_SIZE + 20),
      y: 300
    }))

    setCards(initialCards)
    setTargets(initialTargets)
  }, [loadedTextures])

  return {
    cards,
    setCards,
    targets,
    draggedCard,
    setDraggedCard,
    dragOffset,
    setDragOffset,
    mousePosition,
    setMousePosition
  }
} 