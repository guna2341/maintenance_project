import React from 'react'
import { AlertCard, Appbar, AppLogo, BlockCard, ControlCard, InputComponent, PieChart, ProfileMenu, RoomStatus } from '../components'
import { SwiperComponent } from '../components/swiper'
import { blocks } from '../utils'
import LoginPage from './login'
import AddBlockPage from './addBlock'
import { AddRoomModal } from '../components/addRoom'
import { AddFloor } from '../components/addFloor'

export const Test = () => {
  return (
    <div>
      <AddFloor/>
    </div>
  )
}
