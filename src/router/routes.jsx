import Home from '@pages/Home';
import About from '@pages/About';
import Contact from '@pages/Contact';
import { Profile } from '@components/Profile/Profile';
import CardsGame from '@components/CardsGame/CardsGame';

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
