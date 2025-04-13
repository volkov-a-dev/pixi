import { AppRouter } from '@router/Router';
import { ThemeProvider } from '@theme/ThemeProvider';


const App = () => (
  <ThemeProvider>
    <AppRouter />
  </ThemeProvider>
);

export default App;
