import { Appbar, SideBar } from '../components'
import { Outlet, Navigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';

export const MainLayout = () => {

  const token = secureLocalStorage.getItem('token');

  if (!token) {
    return <Navigate to="../login" replace />;
  }

  return (
    <div className='flex h-screen flex-col !scrollbar-hide'>
      <Appbar />
      <div className='h-full w-full flex'>
        <SideBar />
        <main className="flex-1 overflow-auto p-4 pr-0 w-full !crollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
