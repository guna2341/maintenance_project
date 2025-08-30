import { CircularProgress } from '@heroui/progress'
import React from 'react'

export const OperationCard = (
    {
        value = 0,
        loading
    }
) => {
    return (
        <div
            className='bg-white border font-poppins flex flex-col text-normal text-sm w-full max-h-[81px] border-black/10 py-2 px-3 rounded-xl $'
        >
            <div className='flex items-center mt-1 justify-between font-poppins font-normal text-sm'>
                Operational Status
                {loading ?
                      <CircularProgress
                        size="md"
                        aria-label='progress'
                        classNames={{
                            base: "rotate-180",
                            svg: "w-12 h-12",
                            indicator: "stroke-[url(#progress-gradient)]",
                            value: "rotate-180 text-custom-700 font-poppins font-medium text-xs"
                        }}
                    />
                    :
                    <CircularProgress
                        size="md"
                        aria-label='progress'
                        showValueLabel
                        value={value}
                        classNames={{
                            base: "rotate-180",
                            svg: "w-12 h-12",
                            indicator: "stroke-[url(#progress-gradient)]",
                            value: "rotate-180 text-custom-700 font-poppins font-medium text-xs"
                        }}
                    />
                    
                }
            </div>
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#0074FF" />
                        <stop offset="100%" stopColor="#003B83" />
                    </linearGradient>
                </defs>
            </svg>
        </div>)
}
