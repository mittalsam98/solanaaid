import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainAppLayout from './components/layouts/MainAppLayout';
import Airdrop from './pages/Airdrop';
import AccountInfo from './pages/AccountInfo';
import CreateToken from './pages/CreateToken';
import { Dashboard } from './pages/Dashboard';
import Wallets from './pages/Wallets';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainAppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/create-token' element={<CreateToken />} />
          <Route path='/air-drop' element={<Airdrop />} />
          <Route path='/account-info' element={<AccountInfo />} />
          <Route path='/wallet' element={<Wallets />} />
        </Route>
      </Routes>
    </Router>
  );
}
