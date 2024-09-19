import Sidebar from '@/components/AppSidebar/Sidebar';
import { Outlet } from 'react-router-dom';
// import WalletHeader from '../Header/WalletHeader';

export default function WalletAppLayout() {
  return (
    <div className='flex min-h-screen w-full  bg-muted/40'>
      <Sidebar />

      <div className='flex flex-col sm:gap-4 w-full'>
        {/* <WalletHeader /> */}
        <Outlet />
      </div>
    </div>
  );
}
