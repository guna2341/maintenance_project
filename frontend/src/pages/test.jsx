import { cn } from '@heroui/theme'
import React from 'react'

export const Chat = ({
  message = <div className='font-poppins font-normal txt-sm'>
    These are the current recommendations.
    <br/>
    Would you like me to:
    <br/>
    <ul className="list-disc pl-5 marker:text-xs">
      <li>Explain why these were suggested</li>
      <li>Suggest alternative approaches</li>
      <li>Highlight guideline-based steps?</li>
        </ul>
      </div>,
  logo = "logo",
  align = "left",
  copy = "copy",
  like = "like",
  dislike = "dislike",
  className
}) => {
  return (
    <div
      className={cn(
        "w-full flex",
        {
          "justify-start": align === "left",
          "justify-end": align === "right"
        },
      )}
    >
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="flex items-start gap-3">
          <div>{logo}</div>
          <div className='flex flex-col gap-2'>
            <div>{message}</div>
            <div className="flex items-center gap-2">
              <span>{copy}</span>
              <span>{like}</span>
              <span>{dislike}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
