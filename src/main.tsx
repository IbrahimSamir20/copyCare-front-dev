import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppConfigProvider from './components/AppConfigProvider';

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppConfigProvider />
    </StrictMode>
  );
}
