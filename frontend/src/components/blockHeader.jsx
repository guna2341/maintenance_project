import { Chip } from '@heroui/chip'
import { Skeleton } from '@heroui/skeleton'

export const BlockHeader = ({ block, states, loading }) => {
    return (
        <div
            className='flex flex-row items-center gap-2 justify-between'
        >
            {loading ?
                <Skeleton
                className='w-full max-w-[50%] h-3 rounded-full'
                />
                :
                <span
                    className='font-poppins font-semibold text-sm sm:text-base'
                >{block}</span>
            }
            <div className='bg-white font-poppins font-medium text-xs sm:text-sm pl-4 p-1 max-h-[27px] rounded-full flex items-center gap-3'>
                Total
                {loading ?
                    <Skeleton
                    className='w-6 h-5 rounded-full'
                    />
                    :
                    <Chip
                        className='bg-black/5 max-h-[21px] p-0 font-poppins font-medium text-xs sm:text-sm flex items-center justify-center'
                    >{(states?.active + states?.inactive + states?.maintenance) || 0}</Chip>
}
            </div>
        </div>
    )
}
