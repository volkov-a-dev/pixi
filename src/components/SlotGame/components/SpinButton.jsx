import { useRef } from 'react';
import { extend } from '@pixi/react';
import { Container, Sprite, Text } from 'pixi.js';
import { gsap } from 'gsap';
import { DropShadowFilter } from 'pixi.js';
import { SLOT_CONFIG } from '../configs/slotConfig';

extend({ Container, Sprite, Text });

export const SpinButton = ({ onSpin, isSpinning }) => {
  const buttonRef = useRef(null);
  const [buttonScale, setButtonScale] = useState(1);
  const [buttonShadow, setButtonShadow] = useState(false);

  const handleButtonOver = () => {
    gsap.to(buttonScale, {
      value: SLOT_CONFIG.BUTTON_CONFIG.scale.hover,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => setButtonScale(buttonScale.value),
      onStart: () => {
        if (buttonRef.current) {
          buttonRef.current.filters = [
            new DropShadowFilter(SLOT_CONFIG.BUTTON_CONFIG.shadow)
          ];
        }
        setButtonShadow(true);
      }
    });
  };

  const handleButtonOut = () => {
    gsap.to(buttonScale, {
      value: SLOT_CONFIG.BUTTON_CONFIG.scale.normal,
      duration: 0.3,
      ease: 'power2.out',
      onUpdate: () => setButtonScale(buttonScale.value),
      onComplete: () => {
        if (buttonRef.current) {
          buttonRef.current.filters = [];
        }
        setButtonShadow(false);
      }
    });
  };

  return (
    <pixiContainer 
      y={150}
      interactive={true}
      eventMode="static"
      scale={buttonScale}
      cursor="pointer"
      onPointerDown={onSpin}
      onPointerOver={handleButtonOver}
      onPointerOut={handleButtonOut}
    >
      <pixiSprite
        ref={buttonRef}
        texture={textures[1]}
        width={SLOT_CONFIG.BUTTON_CONFIG.width}
        height={SLOT_CONFIG.BUTTON_CONFIG.height}
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
  );
}; 