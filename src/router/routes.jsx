// import Home from '@pages/Home';
// import About from '@pages/About';
// import Contact from '@pages/Contact';
import CardsGame from '@pages/CardsGame';
import Slot from '@pages/Slot';



export const routes = [
  {
    path: '/cards-game',
    element: <CardsGame />,
    name: 'Cards Game',
  },
  {
    path: '/slot',
    element: <Slot />,
    name: 'Slot',
  }
];
