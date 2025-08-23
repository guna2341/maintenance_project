import { Chip } from '@heroui/chip'

export const BlockHeader = ({ block, states }) => {
    return (
        <div
            className='flex items-center gap-2 justify-between'
        >
            <span
                className='font-poppins font-semibold text-base'
            >{block}</span>
            <div className='bg-white font-poppins font-medium text-sm pl-4 p-1 max-h-[27px] rounded-full flex items-center gap-3'>
                Total
                <Chip
                    className='bg-black/5 max-h-[21px] p-0 font-poppins font-medium text-sm flex items-center justify-center'
                >{(states?.active + states?.inactive + states?.maintenance) || 0}</Chip>
            </div>
        </div>
    )
}
