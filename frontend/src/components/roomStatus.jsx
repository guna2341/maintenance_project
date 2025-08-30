import { Skeleton } from '@heroui/skeleton';
import { cn } from '@heroui/theme';
import React from 'react';

export const RoomStatus = ({
    block,
    loading
}) => {
    const allRooms = block?.floors?.flatMap((floor) => floor?.rooms || []) || [];
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
            {loading ? <div className='flex flex-wrap gap-y-4 gap-x-4 mt-4'>
                {Array(3).fill(null).map(items => Array(8).fill(null).map((item,index) => (
                    <Skeleton className='px-1.5 w-6 py-0.5 aspect-[4/4] rounded-full text-white text-md flex items-center justify-center'
                        key={index}
                   />
                )))}
            </div> :
                <div className='flex flex-wrap gap-y-4 gap-x-4 mt-4'>
                    {allRooms.map((room, index) => (
                        <div
                            key={room._id}
                            className={cn(
                                'px-1.5 py-0.5 min-w-[10px] aspect-[4/4] rounded-full text-white text-md flex items-center justify-center',
                                {
                                    'bg-custom-400': room.state === 'active',
                                    'bg-custom-500': room.state === 'inactive',
                                    'bg-custom-200': room.state === 'maintenance',
                                }
                            )}
                        >
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
};
