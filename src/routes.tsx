import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import MainAppLayout from './components/layouts/MainAppLayout';
import CreateToken from './pages/CreateToken';
import Airdrop from './pages/Airdrop';
import Wallets from './pages/Wallets';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainAppLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/create-token' element={<CreateToken />} />
          <Route path='/wallet' element={<Wallets />} />
          <Route path='/air-drop' element={<Airdrop />} />
        </Route>
      </Routes>
    </Router>
  );
}
