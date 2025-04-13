import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@components/Layout/Layout';
import { routes } from './routes';

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<Layout />}>
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  </Router>
);
