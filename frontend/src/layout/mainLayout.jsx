import React from 'react'
import { Appbar } from '../components'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
      <div className='flex h-screen flex-col'>
          <Appbar />
          <Outlet />
    </div>
  )
}
