import Home from '@pages/Home';
import About from '@pages/About';
import Contact from '@pages/Contact';
import CardsGame from '@pages/CardsGame';

import { Profile } from '@components/Profile/Profile';


export const routes = [
  {
    path: '/',
    element: <Home />,
    name: 'Home',
  },
  {
    path: '/about',
    element: <About />,
    name: 'About',
  },
  {
    path: '/contact',
    element: <Contact />,
    name: 'Contact',
  },
  {
    path: '/profile',
    element: <Profile />,
    name: 'Profile',
  },
  {
    path: '/cards-game',
    element: <CardsGame />,
    name: 'Cards Game',
  },
];
