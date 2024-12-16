// src/main.tsx
// import React from 'react';
import ErrorBoundary from '@src/components/common/errors/ErrorBoundary.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import App from './AppRoutes.tsx';
import Layout from './components/common/layout/Layout';
import { Web3Provider } from './lib/config/web3Provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Web3Provider>
        <ErrorBoundary>
          <Layout>
            <App />
          </Layout>
        </ErrorBoundary>
      </Web3Provider>
    </BrowserRouter>
  </StrictMode>
);
