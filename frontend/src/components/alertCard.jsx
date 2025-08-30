import React from 'react';
import { Alert } from '../assets';
import { Skeleton } from '@heroui/skeleton';

export const AlertCard = ({
    block,
    loading
}) => {
    const alerts = block?.floors
        .map(floor => ({
            ...floor,
            rooms: floor.rooms.filter(room => room?.issue)
        })).filter(floor => floor.rooms.length > 0);

    if (alerts?.length == 0) {
        return (
            <div className='border w-full flex flex-col gap-3 border-black/15 rounded-lg bg-white py-3.5 px-3 font-poppins font-normal text-[14px] text-custom-300'>
                Active Alerts
                <div className='font-poppins text-center font-medium'>
                    No Issues found
                </div>
            </div>
        )
    };

    if (loading) {
        return (
            <div className='border w-full flex flex-col gap-3 border-black/15 rounded-lg bg-white py-3.5 px-3 font-poppins font-normal text-[14px] text-custom-300'>
                Active Alerts
                <div className='flex flex-col gap-2'>
                    {Array(3).fill(null).map((item, index) => (
                        <Skeleton
                            key={index}
                            className='w-full h-[20px] rounded-xl'
                        />
                    ))}
                </div>
            </div>
        )
    };

    return (
        <div className='border w-full flex flex-col gap-3 border-black/15 rounded-lg bg-white py-3.5 px-3 font-poppins font-normal text-[14px] text-custom-300'>
            Active Alerts
            <div className='flex flex-col gap-2'>
                {alerts?.map(items => items?.rooms?.map(item => {
                    if (item?.issue) {
                        return (
                            <div className='flex items-center gap-2 bg-custom-500/10 rounded-lg p-1.5'
                                key={item?.id}
                            >
                                <Alert />
                                <div className='bg-white px-2 rounded-md text-[12px] text-wrap'>
                                    {items?.block} - {item?.room}
                                </div>
                                <div className='text-custom-500 text-[12px]'>
                                    {item?.issue}
                                </div>
                            </div>
                        );
                    }
                }))}
            </div>
        </div>
    )
};
