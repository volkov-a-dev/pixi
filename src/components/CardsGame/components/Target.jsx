import { useCallback } from 'react'
import { TARGET_SIZE } from '../constants/index'

export const Target = ({ target, loadedTextures }) => {
  const drawTarget = useCallback((g) => {
    g.clear()
    g.lineStyle(2, 0x000000)
    g.beginFill(0xF0F0F0)
    g.drawRoundedRect(0, 0, TARGET_SIZE, TARGET_SIZE, 10)
    g.endFill()
  }, [])

  return (
    <pixiContainer x={target.x} y={target.y}>
      <pixiGraphics draw={drawTarget} />
      <pixiSprite
        texture={loadedTextures[target.suit]}
        width={TARGET_SIZE}
        height={TARGET_SIZE}
        anchor={0.5}
        x={TARGET_SIZE / 2}
        y={TARGET_SIZE / 2}
      />
    </pixiContainer>
  )
} 