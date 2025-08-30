import { Accordion, AccordionItem } from '@heroui/accordion'
import { cn } from '@heroui/theme'
import React from 'react'

export const AccordianComponent = (
    {
        index,
        aria_label,
        title,
        content
    }
) => {
    return (
        <Accordion className="bg-white rounded-lg border border-gray-300 py-2 border-l-3 border-l-custom-200">
            <AccordionItem
                key={index}
                aria-label={aria_label}
                title={
                   title
            }
                classNames={{
                    trigger: "data-[focus-visible=true]:ring-0 data-[focus-visible=true]:outline-0 border-0"
                }}
            >
                <hr className='text-gray-300' />
                <div className='pt-4 cursor-auto'>
                    {content}
                </div>
            </AccordionItem>
        </Accordion>
    )
}
