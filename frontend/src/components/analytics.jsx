import React from 'react'
import { PieChart } from './pieChart'
import { AlertCard } from './alertCard'

export const Analytics = () => {
  return (
    <div className='w-full h-full flex flex-col gap-2.5 border border-black/15 bg-custom-100 p-2.5 rounded-lg'>
      <div className='text-center w-full font-poppins font-medium text-base'>
        Analytics
      </div>
      <div className='h-full flex flex-col items-center gap-2.5'>
        <div className='w-full max-h-[210px] bg-white py-3.5 px-3 pb-0 font-poppins font-normal text-[14px] text-custom-300 rounded-lg border border-black/15'>
          Overall Summary
          <div className='h-[230px] mt-[-22px]'>
            <PieChart />
          </div>
        </div>
        <AlertCard/>
      </div>
    </div>
  )
}
