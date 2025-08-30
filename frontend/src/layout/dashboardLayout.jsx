import React from 'react'
import { Analytics, BlockLoading, BlockOverview } from '../components'
import { SwiperComponent } from '../components/swiper';
import { UseDashboardStore } from '../stores';

export const DashboardLayout = ({ filteredBlock }) => {
    const loaders = UseDashboardStore(e => e.loaders);
    const blocks = UseDashboardStore(e => e.blocks);
    const [height, setHeight] = React.useState(0);
    const [index, setIndex] = React.useState(0);
    return (
        <>
            <div className='mt-3 sm:mt-1'>
                <SwiperComponent
                    loading={loaders.getLoading}
                    blocks={filteredBlock}
                    onClick={e => setIndex(e)}
                />
            </div>
            {
                loaders.getLoading ?
                    <BlockLoading
                        height={height}
                        blocks={blocks}
                        index={index}
                        setHeight={e => setHeight(e)}
                    />
                    :
                    <div className={`hidden sm:flex sm:flex-row flex-col h-full gap-5 items-stretch mt-2`}
                    >
                        <div className="flex-3 flex flex-col gap-10"
                            style={{ height: height > 0 ? `${height}px` : 'auto' }}
                        >
                            <div className="flex-1 flex flex-col gap-10 pb-2.5 overflow-y-auto scrollbar-thin scrollbar-thumb-custom-300/10 scrollbar-track-transparent">
                                {blocks[index]?.floors?.map(item => (
                                    <BlockOverview
                                        loading={loaders.getLoading}
                                        key={item?._id}
                                        blocks={blocks[index]}
                                        block={`${blocks[index]?.block?.toUpperCase()} - ${item?.block}`}
                                        states={item?.states}
                                        rooms={item?.rooms}
                                        floorId={item?._id}
                                        blockId={blocks[index]?._id}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex-1.5 w-full sm:max-w-[400px] flex flex-col">
                            <Analytics
                                states={blocks[index]?.states}
                                block={blocks[index]}
                                index={index}
                                onHeightChange={e => setHeight(e)} />
                        </div>
                    </div>
            }
            <div className={`flex sm:flex-row sm:hidden flex-col h-full gap-5 items-stretch mt-2`}
            >
                <div className="flex-3 flex flex-col gap-10"
                >
                    <div className="flex-1 flex flex-col gap-10 pb-1 overflow-y-auto scrollbar-thin scrollbar-thumb-custom-300/10 scrollbar-track-transparent">
                        <div className="flex-1.5 w-full sm:max-w-[400px] flex flex-col">
                            <Analytics
                                states={blocks[index]?.states}
                                block={blocks[index]}
                                onHeightChange={e => setHeight(e)} />
                        </div>
                        {blocks[index]?.floors?.map(item => (
                            <BlockOverview
                                key={item?._id}
                                loading={loaders.getLoading}
                                block={`${blocks[index].block.toUpperCase()} - ${item?.block}`}
                                states={blocks[index]?.states}
                                rooms={item?.rooms}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div>

            </div></>
    )
}
