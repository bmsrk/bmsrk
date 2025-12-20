import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import App from './App';
import { ResumeProvider } from './context/ResumeContext';
import { ErrorBoundary } from './components/common';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);