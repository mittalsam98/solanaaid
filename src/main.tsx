import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import WalletContextProvider from './contexts/WalletContextProvider';
import './index.css';
import AppRoutes from './routes';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <WalletContextProvider>
      <TooltipProvider>
        <AppRoutes />
        <Toaster />
      </TooltipProvider>
    </WalletContextProvider>
  </QueryClientProvider>
);
