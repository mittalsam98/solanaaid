import Header from '@/components/Header/Header';
import Sidebar from '@/components/AppSidebar/Sidebar';
import { Outlet } from 'react-router-dom';

export default function MainAppLayout() {
  return (
    <div className='flex min-h-screen w-full  bg-muted/40'>
      <Sidebar />

      <div className='flex flex-col  items-center sm:gap-4 w-full'>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
