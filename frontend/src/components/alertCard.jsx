import React from 'react';
import { Alert } from '../assets';

export const AlertCard = ({
    alerts = [
        {
            id: "1",
            block: "Sunflower - First Floor",
            issue: "Power Issue"
        },
        {
            id: "2",
            block: "AS - First Floor",
            issue: "Power Issue"
        }
    ]
}) => {
  return (
      <div className='border w-full flex flex-col gap-3 border-black/15 rounded-lg bg-white py-3.5 px-3 font-poppins font-normal text-[14px] text-custom-300'>
          Active Alerts
          <div className='flex flex-col gap-2'>
              {alerts.map(item => (
              <div className='flex items-center gap-2 bg-custom-500/10 rounded-lg p-1.5'>
                  <Alert />
                  <div className='bg-white px-2 rounded-md text-sm'>
                      {item.block}
                      </div>
                      <div className='text-custom-500 text-sm'> 
                          {item.issue}
                      </div>
                  </div>
              ))}
          </div>
    </div>
  )
}
