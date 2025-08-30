import React from 'react'
import { BlockOverview } from './blockOverview'
import { Analytics } from './analytics'
import { UseDashboardStore } from '../stores'

export const BlockLoading = (
    {
        height,
        blocks,
        setHeight,
        index
    }
) => {

    const loaders = UseDashboardStore(e => e.loaders);

  return (
   <div className={`hidden sm:flex sm:flex-row flex-col h-full gap-5 items-stretch mt-2`}
          >
            <div className="flex-3 flex flex-col gap-10"
              style={{ height: height > 0 ? `${height}px` : 'auto' }}
            >
              <div className="flex-1 flex flex-col gap-10 pb-1 overflow-y-auto scrollbar-thin scrollbar-thumb-custom-300/10 scrollbar-track-transparent">
              {Array(2).fill(null).map((item,index) => (
                  <BlockOverview
                      loading={loaders.getLoading}
                      key={index}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1.5 w-full sm:max-w-[400px] flex flex-col">
              <Analytics
                loading={loaders.getLoading}
                states={blocks[index]?.states}
                block={blocks[index]}
                onHeightChange={e => setHeight(e)} />
            </div>
          </div>  )
}
