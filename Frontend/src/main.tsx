import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { NavigationProvider } from './lib/navigation';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavigationProvider>
      <App />
    </NavigationProvider>
  </StrictMode>,
);
