import { cn } from '@heroui/theme';
import React from 'react';

export const RoomStatus = ({
    block
}) => {


  return (
      <div className='border border-black/15 rounded-lg p-3 bg-white'>
          <div className='flex items-center gap-2.5 font-poppins font-normal text-sm text-custom-300'>
              <div>Room Status</div>
              <div className='flex items-center gap-1.5 border border-black/15 rounded-2xl px-3 text-[10px]'>
                  <div className='w-[5px] h-[5px] bg-custom-400 rounded-full'></div>
                  <span className='pt-[3px]'>Active</span>
              </div>
              <div className='flex items-center gap-1.5 border border-black/15 rounded-2xl px-3 text-[10px]'>
                  <div className='w-[5px] h-[5px] bg-custom-500 rounded-full'></div>
                  <span className='pt-[3px]'>Inactive</span>
              </div>
              <div className='flex items-center gap-1.5 border border-black/15 rounded-2xl px-3 text-[10px]'>
                  <div className='w-[5px] h-[5px] bg-custom-200 rounded-full'></div>
                  <span className='pt-[3px]'>Maintenance</span>
              </div>
          </div>
          <div className='flex flex-wrap gap-y-4 gap-x-4 mt-4'>
          {block.floors?.map(items => items.rooms.map(item => (
              <div className={cn('px-2 py-1 aspect-[4/4] w-fit rounded-full text-white flex items-center justify-center', {
                  'bg-custom-400': item.state === 'active',
                  'bg-custom-500': item.state === 'inactive',
                  'bg-custom-200': item.state === 'maintenance'
              })}
              key={item.id}
              >
                    {item.id.length <= 1 ? "0" + item.id : item.id}
              </div>
          )))}
              </div>
    </div>
  )
}
