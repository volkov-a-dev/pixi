import { useEffect, useRef, useState } from 'react';
import { extend } from '@pixi/react';
import { Container } from 'pixi.js';
import { gsap } from 'gsap';
import { Symbol } from './Symbol';
import { SLOT_CONFIG } from '../configs/slotConfig';

extend({ Container });

export const Reel = ({ index, textures, isSpinning, onSpinComplete }) => {
  const [symbols, setSymbols] = useState([]);
  const [finalSymbol, setFinalSymbol] = useState(null);
  const reelRef = useRef(null);

  useEffect(() => {
    if (isSpinning) {
      if (reelRef.current) {
        reelRef.current.y = 0;
      }

      const newSymbols = [];
      for (let i = 0; i < 100; i++) {
        const symbolType = SLOT_CONFIG.SYMBOLS[Math.floor(Math.random() * SLOT_CONFIG.SYMBOLS.length)];
        newSymbols.push({
          texture: textures[parseInt(symbolType)],
          y: SLOT_CONFIG.SYMBOL_SIZE * (i - 50),
          id: `${index}-${i}-${Date.now()}`
        });
      }
      
      setFinalSymbol(newSymbols[newSymbols.length - 1]);
      setSymbols(newSymbols);

      gsap.to(reelRef.current, {
        y: '+=5000',
        duration: SLOT_CONFIG.SPIN_DURATION * 2,
        delay: index * 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          onSpinComplete();
        },
      });
    }
  }, [isSpinning, index, textures, onSpinComplete]);

  return (
    <pixiContainer ref={reelRef} x={index * (SLOT_CONFIG.SYMBOL_SIZE + 30)}>
      {symbols.map((symbol) => (
        <Symbol key={symbol.id} texture={symbol.texture} y={symbol.y} />
      ))}
      {finalSymbol && !isSpinning && (
        <Symbol texture={finalSymbol.texture} y={SLOT_CONFIG.SYMBOL_SIZE / 2} />
      )}
    </pixiContainer>
  );
}; 