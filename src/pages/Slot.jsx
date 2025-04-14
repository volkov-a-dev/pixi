import {
    Application,
    extend,
} from '@pixi/react';
import {
    Container,
    Graphics,
    Text,
} from 'pixi.js';

import { SlotMachine } from '@components/SlotGame/SlotMachine';

extend({
    Container,
    Graphics,
    Text,
});

export default function Slot() {
    return (
        <Application
            width={800}
            height={600}
        >
            <SlotMachine />
        </Application>
    );
}
