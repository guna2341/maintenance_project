import { DownArrow, Logo } from '../assets';
import { Chip } from '@heroui/chip';

export const Appbar = () => {
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
            <div className='flex items-center'> 
                <Chip
                    className='bg-white cursor-pointer py-[5px] px-0 !h-fit border border-black/10 items-center'
                >
                    <div className='flex items-center gap-4'>
                        <div
                            className='rounded-full font-poppins font-normal text-md sm:text-xl min-w-[25px] min-h-[25px] sm:min-w-[30px] sm:min-h-[30px] flex items-center justify-center text-white bg-orange-400'
                        >
                            S
                        </div>
                        <DownArrow />
                    </div>
                </Chip>
            </div>
        </div>
    )
}

                    