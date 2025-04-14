import { useEffect, useRef, useState, useCallback } from 'react';
import { extend } from '@pixi/react';
import { Container, Sprite, Text } from 'pixi.js';
import { gsap } from 'gsap';
import { useTextureLoader } from '@hooks/useTextureLoader';
import { TEXTURE_URLS } from './configs/cards';

extend({
  Container,
  Sprite,
  Text,
});

const SYMBOLS = ['3', '4', '5', '6', '7'];
const REEL_COUNT = 3;
const SYMBOL_SIZE = 100;
const SPIN_DURATION = 2;

const Symbol = ({ texture, y = 0 }) => {
  return (
    <pixiSprite
      texture={texture}
      anchor={0.5}
      y={y}
      scale={Math.min(SYMBOL_SIZE / texture.width, SYMBOL_SIZE / texture.height)}
    />
  );
};

const Reel = ({ index, textures, isSpinning, onSpinComplete }) => {
  const [symbols, setSymbols] = useState([]);
  const [finalSymbol, setFinalSymbol] = useState(null);
  const reelRef = useRef(null);

  useEffect(() => {
    if (isSpinning) {
      // Reset position
      if (reelRef.current) {
        reelRef.current.y = 0;
      }

      const newSymbols = [];
      for (let i = 0; i < 100; i++) {
        const symbolType = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        newSymbols.push({
          texture: textures[parseInt(symbolType)],
          y: SYMBOL_SIZE * (i - 50),
          id: `${index}-${i}-${Date.now()}`
        });
      }
      
      // Set the final symbol that will remain after spinning
      setFinalSymbol(newSymbols[newSymbols.length - 1]);
      setSymbols(newSymbols);

      gsap.to(reelRef.current, {
        y: '+=5000',
        duration: SPIN_DURATION * 2,
        delay: index * 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          // setSymbols([]); // Clear spinning symbols
          onSpinComplete();
        },
      });
    }
  }, [isSpinning, index, textures, onSpinComplete]);

  return (
    <pixiContainer ref={reelRef} x={index * (SYMBOL_SIZE + 30)}>
      {symbols.map((symbol) => (
        <Symbol key={symbol.id} texture={symbol.texture} y={symbol.y} />
      ))}
      {finalSymbol && !isSpinning && (
        <Symbol texture={finalSymbol.texture} y={SYMBOL_SIZE / 2 } />
      )}
    </pixiContainer>
  );
};

export const SlotMachine = () => {
  const loadedTextures = useTextureLoader({TEXTURE_URLS})
  const [isSpinning, setIsSpinning] = useState(false);
  const completedReels = useRef(0);
  const buttonContainerRef = useRef(null);

  const handleSpinComplete = () => {
    completedReels.current += 1;
    if (completedReels.current === REEL_COUNT) {
      setIsSpinning(false);
      completedReels.current = 0;
    }
  };

  const handleStartSpin = useCallback(() => {
    console.log('handleStartSpin called');
    if (isSpinning) return;
    setIsSpinning(true);
  }, [isSpinning]);

  const handleButtonOver = () => {
    gsap.to(buttonContainerRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  const handleButtonOut = () => {
    gsap.to(buttonContainerRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  return (
    <pixiContainer width={500} height={500}>
      <pixiContainer 
        x={350} 
        y={250} 
        anchor={0.5}
      >
        <pixiContainer width={400} height={300}>
          <pixiSprite
            texture={loadedTextures[2]}
            width={400}
            height={200}
            anchor={0.5}
          />
          <pixiContainer x={-130} y={0} >
            {Object.keys(loadedTextures).length > 0 && Array.from({ length: REEL_COUNT }).map((_, index) => (
              <Reel
                key={index}
                index={index}
                textures={loadedTextures}
                isSpinning={isSpinning}
                onSpinComplete={handleSpinComplete}
              />
            ))}
          </pixiContainer>
        </pixiContainer>
        <pixiContainer 
          ref={buttonContainerRef}
          y={150}
          interactive={true}
          eventMode="static"
          scale={1}
          cursor="pointer"
          onPointerDown={handleStartSpin}
          // onPointerOver={handleButtonOver} // TO DO: need to fix render
          // onPointerOut={handleButtonOut}
        >
          <pixiSprite
            texture={loadedTextures[1]}
            width={150}
            height={45}
            anchor={0.5}
          />
          <pixiText
            text="SPIN"
            anchor={0.5}
            style={{
              fontFamily: 'Arial',
              fontSize: 24,
              fill: 0xffffff,
              align: 'center',
              fontWeight: 'bold'
            }}
          />
        </pixiContainer>
      </pixiContainer>
    </pixiContainer>
  );
};

