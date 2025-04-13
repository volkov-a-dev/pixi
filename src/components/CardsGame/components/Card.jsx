import { Rectangle } from 'pixi.js'
import { CARD_WIDTH, CARD_HEIGHT } from '../constants/index'

export const Card = ({ card, loadedTextures, onPointerDown, onPointerMove, onPointerUp }) => {
  return (
    <pixiContainer
      x={card.x}
      y={card.y}
      interactive={true}
      eventMode="static"
      cursor="pointer"
      hitArea={new Rectangle(0, 0, CARD_WIDTH, CARD_HEIGHT)}
      onPointerDown={(e) => onPointerDown(e, card)}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerUpOutside={onPointerUp}
    >
      <pixiSprite
        texture={loadedTextures[card.suit]}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        anchor={0.5}
        x={CARD_WIDTH / 2}
        y={CARD_HEIGHT / 2}
      />
    </pixiContainer>
  )
}