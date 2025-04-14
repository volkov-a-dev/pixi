import { extend } from '@pixi/react';
import { Sprite } from 'pixi.js';
import { SLOT_CONFIG } from '../configs/slotConfig';

extend({ Sprite });

export const Symbol = ({ texture, y = 0 }) => {
  return (
    <pixiSprite
      texture={texture}
      anchor={0.5}
      y={y}
      scale={Math.min(
        SLOT_CONFIG.SYMBOL_SIZE / texture.width,
        SLOT_CONFIG.SYMBOL_SIZE / texture.height
      )}
    />
  );
}; 