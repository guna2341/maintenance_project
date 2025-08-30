import React from 'react';
import { DownArrow, Logo } from '../assets';
import { Chip } from '@heroui/chip';
import { ProfileMenu } from './profileMenu';
import { cn } from '@heroui/theme';

export const Appbar = () => {
    const [menu, setMenu] = React.useState(false)
    console.log(menu)
    return (
        <div
            className='max-h-[80px] flex items-center justify-between bg-custom-100 p-8'
        >
            <div className='flex items-center gap-2 sm:gap-4 h-full'>
           
                <div className='font-medium h-full text-md sm:text-xl flex font-poppins items-center gap-1.5'>
                    <div className='h-fit'>
                        <Logo />
                    </div>
                    <div className='text-custom-200 flex items-center'>
                        BIT
                    </div>
                    <span className='text-custom-300 flex items-center'>
                        Maintenance
                    </span>
                </div>
            </div>
            <ProfileMenu
            >
                <div className='flex items-center'
                onClick={() => setMenu(!menu)}
                > 
                <Chip
                        className={cn('bg-white cursor-pointer py-[5px] hover:shadow transition-all px-0 !h-fit border border-black/10 items-center', {
                            'shadow' : menu
                        })}
                >
                    <div className='flex items-center gap-4'>
                        <div
                            className='rounded-full font-poppins font-normal text-md sm:text-base min-w-[20px] min-h-[20px] sm:min-w-[25px] sm:min-h-[25px] flex items-center justify-center text-white bg-orange-400'
                        >
                            S
                            </div>
                            <span className={cn('transition-all',{
                                'rotate-180': menu,
                                'rotate-0': !menu
                            })}>
                                <DownArrow />
                            </span>
                    </div>
                </Chip>
                </div>
            </ProfileMenu>
        </div>
    )
}

                    