import React from 'react'
import { AlertCard, Appbar, BlockCard, ControlCard, InputComponent, PieChart, RoomStatus } from '../components'
import { SwiperComponent } from '../components/swiper'
import { blocks } from '../utils'

export const Test = () => {
  return (
      <div className='flex flex-col gap-4 p-4'>
          <Appbar />
          <div className='flex items-center gap-4'>
              <BlockCard />
      </div>
      <ControlCard />
      <InputComponent />
      <SwiperComponent
      blocks = {blocks}
      />
      {/* <PieChart /> */}
      <AlertCard />
      <RoomStatus />
    </div>
  )
}
