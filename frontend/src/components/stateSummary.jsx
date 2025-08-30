import { Card, CardBody } from '@heroui/card'
import { Skeleton } from '@heroui/skeleton'
import { cn } from '@heroui/theme'
import React from 'react'

export const StateSummary = ({ cardName, length, label, loading = true }) => {
    function getBg(state) {
        switch (state) {
            case 'active':
                return 'border-l-4 border-l-custom-400/80'
            case 'inactive':
                return 'border-l-4 border-l-custom-500/80'
            case 'maintenance':
                return 'border-l-4 border-l-custom-200/90'
            default:
                return 'border-l-4 border-l-custom-300/70'
        }
    }

    function getText(state) {
        switch (state) {
            case 'active':
                return 'text-custom-400'
            case 'inactive':
                return 'text-custom-500'
            case 'maintenance':
                return 'text-custom-200'
            default:
                return 'Unknown'
        }
    }

    return (
        <Card className={`border border-black/15 ${getBg(label)} font-poppins`}>
            <CardBody className="py-4 pb-3">
                <div className="flex justify-between items-center">
                    <div className='flex flex-col gap-1'>
                        <p className={`text-sm ${getText(label)}`}>
                            {cardName}
                        </p>
                        <h3 className="text-2xl font-medium text-custom-300">{loading ?
                            <Skeleton
                                className='w-7 h-7 mt-1 rounded-xl'
                            />
                            :
                            length
                        }
                        </h3>
                    </div>
                </div>
            </CardBody>
        </Card>)
}
