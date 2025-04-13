import { extend, useTick } from '@pixi/react'
import {
    Container,
    Graphics,
    Text,
    Sprite,
    Rectangle,
} from 'pixi.js';
import { useCallback } from 'react'
import gsap from 'gsap'

import {  TARGETS_CARDS, SUIT_COLORS, CARD_WIDTH, CARD_HEIGHT, TARGET_SIZE, ANIMATION } from './constants/index'
import { useTextureLoader } from './hooks/useTextureLoader'
import { useGameState } from './hooks/useGameState'
import { useSound } from './hooks/useSound'
import { Target } from './components/Target'
import { Card } from './components/Card'

extend({
    Container,
    Graphics,
    Text,
    Sprite,
    Rectangle,
})


export function CardsGame() {
  const loadedTextures = useTextureLoader()
  const {
    cards,
    setCards,
    targets,
    draggedCard,
    setDraggedCard,
    dragOffset,
    setDragOffset,
    mousePosition,
    setMousePosition
  } = useGameState(loadedTextures)
  const { playCorrectPlacement, playWrongPlacement, playDrag } = useSound()

  useTick(() => {
    if (draggedCard) {
      const newX = mousePosition.x - dragOffset.x
      const newY = mousePosition.y - dragOffset.y

      setCards(prevCards => prevCards.map(prevCard => 
        prevCard.id === draggedCard.id 
          ? { ...prevCard, x: newX, y: newY }
          : prevCard
      ))
    }
  })

  const handlePointerDown = useCallback((event, card) => {
    if (card.isPlaced) return

    const cardGlobalX = card.x
    const cardGlobalY = card.y
    
    setDraggedCard(card)
    setMousePosition({ x: event.global.x, y: event.global.y })
    setDragOffset({
      x: event.global.x - cardGlobalX,
      y: event.global.y - cardGlobalY
    })

    playDrag()
  }, [playDrag])

  const handlePointerMove = useCallback((event) => {
    setMousePosition({ x: event.global.x, y: event.global.y })
  }, [])

  const handlePointerUp = useCallback(() => {
    if (!draggedCard) return

    const card = cards.find(c => c.id === draggedCard.id)
    
    const targetHit = targets.find(t => {
      const isInTarget = (
        card.x + CARD_WIDTH / 2 > t.x &&
        card.x + CARD_WIDTH / 2 < t.x + TARGET_SIZE &&
        card.y + CARD_HEIGHT / 2 > t.y &&
        card.y + CARD_HEIGHT / 2 < t.y + TARGET_SIZE
      )
      return isInTarget
    })

    const isCorrectPosition = targetHit && SUIT_COLORS[card.suit] === targetHit.suit
    let newPositionX = isCorrectPosition ? targetHit.x : card.originalX
    let newPositionY = isCorrectPosition ? targetHit.y : card.originalY
    
    // Play appropriate sound
    if (isCorrectPosition) {
      playCorrectPlacement()
    } else {
      playWrongPlacement()
    }
    
    gsap.to(card, {
      x: newPositionX,
      y: newPositionY,
      duration: ANIMATION.DURATION,
      ease: ANIMATION.EASE,
      onUpdate: () => {
        setCards(prevCards => prevCards.map(prevCard => 
          prevCard.id === card.id 
            ? { ...prevCard, x: card.x, y: card.y }
            : prevCard
        ))
      }
    })

    setDraggedCard(null)
    setDragOffset({ x: 0, y: 0 })
  }, [draggedCard, cards, targets, setCards, playCorrectPlacement, playWrongPlacement])

  if (Object.keys(loadedTextures).length === 0) {
    return null
  }

  return (
    <>
      {targets.map(target => (
        <Target key={target.id} target={target} loadedTextures={loadedTextures} />
      ))}

      <pixiContainer sortableChildren={true}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            loadedTextures={loadedTextures}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            isDragging={draggedCard?.id === card.id}
          />
        ))}
      </pixiContainer>
    </>
  )
}




