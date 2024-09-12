import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import MainAppLayout from './components/layouts/MainAppLayout';
import CreateToken from './pages/CreateToken';
import Airdrop from './pages/Airdrop';
import Wallets from './pages/Wallets';
import WalletAppLayout from './components/layouts/WalletAppLayout';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainAppLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/create-token' element={<CreateToken />} />
          <Route path='/air-drop' element={<Airdrop />} />
        </Route>
        <Route path='/wallet' element={<WalletAppLayout />}>
          <Route index element={<Wallets />} />
        </Route>
      </Routes>
    </Router>
  );
}
