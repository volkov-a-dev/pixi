import {
    Application,
    extend,
} from '@pixi/react';
import {
    Container,
    Graphics,
    Text,
} from 'pixi.js';

import { CardsGame } from './game';

extend({
    Container,
    Graphics,
    Text,
});

export default function App() {
    return (
        <Application
            width={800}
            height={600}
        >
            <CardsGame />
        </Application>
    );
}
