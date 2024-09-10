import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes';
import { TooltipProvider } from './components/ui/tooltip';
import WalletContextProvider from './contexts/WalletContextProvider';
import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletContextProvider>
      <TooltipProvider>
        <AppRoutes />
        <Toaster />
      </TooltipProvider>
    </WalletContextProvider>
  </StrictMode>
);
