import React from 'react'
import { Analytics, BlockLoading, BlockOverview } from '../components'
import { SwiperComponent } from '../components/swiper';
import { UseDashboardStore } from '../stores';

export const DashboardLayout = ({ filteredBlock }) => {
    const loaders = UseDashboardStore(e => e.loaders);
    const blocks = UseDashboardStore(e => e.blocks);
    const [height, setHeight] = React.useState(0);
    const [index, setIndex] = React.useState(0);

    const blockStates = {
        active: blocks[index]?.floors?.reduce(
            (floorSum, floor) =>
                floorSum +
                (floor?.rooms?.reduce(
                    (roomSum, room) => roomSum + (room?.state === "active" ? 1 : 0),
                    0
                ) || 0),
            0
        ),
        inactive: blocks[index]?.floors?.reduce((sum,floor) => sum + floor?.rooms?.reduce((roomSum,item) => roomSum + (item?.state === 'inactive' ? 1 : 0), 0), 0),
        maintenance: blocks[index]?.floors?.reduce((sum,floor) => sum + floor?.rooms?.reduce((roomSum,item) => roomSum + (item?.state === 'maintenance' ? 1 : 0), 0), 0),
    };

    return (
                <>
            <div className='mt-3 sm:mt-1'>
                <SwiperComponent
                    key={index}
                    loading={loaders.getLoading}
                    blocks={filteredBlock}
                    onClick={e => setIndex(e)}
                />
            </div>
            {
                loaders.getLoading ?
                    <BlockLoading
                        key={index}
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
                                {blocks[index]?.floors?.map(item => {
                                    const states = {
                                        active:item?.rooms?.reduce((sum,item) => sum + (item?.state === 'active' ? 1 : 0), 0),
                                        inactive: item?.rooms?.reduce((sum,item) => sum + (item?.state === 'inactive' ? 1 : 0), 0),
                                        maintenance: item?.rooms?.reduce((sum, item) => sum + (item?.state === 'maintenance' ? 1 : 0), 0)
                                    };
                                    return(
                                    <BlockOverview
                                        loading={loaders.getLoading}
                                        key={item?._id}
                                        blocks={blocks[index]}
                                        block={`${blocks[index]?.block?.toUpperCase()} - ${item?.block}`}
                                        states={states}
                                        rooms={item?.rooms}
                                        floorId={item?._id}
                                        blockId={blocks[index]?._id}
                                    />
                                )})}
                            </div>
                        </div>

                        <div className="flex-1.5 w-full sm:max-w-[400px] flex flex-col">
                            <Analytics
                                key={index}
                                states={blockStates}
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
                                key={index}
                                states={blocks[index]?.states}
                                block={blocks[index]}
                                onHeightChange={e => setHeight(e)} />
                        </div>
                        {blocks[index]?.floors?.map(item => (
                            <BlockOverview
                                key={item?._id}
                                loading={loaders.getLoading}
                                block={`${blocks[index].block.toUpperCase()} - ${item?.block}`}
                                states={blockStates}
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
