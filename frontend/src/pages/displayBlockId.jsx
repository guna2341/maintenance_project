import React, { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { UseDashboardStore } from '../stores';
import { SwiperComponent } from '../components/swiper';
import { BlockOverview } from '../components';


export const DisplayBlockId = () => {
    const blocks = UseDashboardStore(e => e.blocks);
    const getBlocks = UseDashboardStore(e => e.getBlocks);
    const [index, setIndex] = useState(0);
    const loaders = UseDashboardStore(e => e.loaders);

    function toast(title, description, color) {
        addToast({
            title,
            description,
            variant: "flat",
            color
        });
    }

    useEffect(() => {
        async function getData() {
            const response = await getBlocks();
            if (!response.state) {
                toast('Some Error Occurred', response.message, 'danger');
                return;
            }
            if (response.data) {
                if (response.data.length === 0) {
                    toast('No Data Found', 'No blocks available. Please refresh the page to try again.', 'warning');
                }
            }
        }

        getData();
    }, []);
    const blockStates = {
        active: blocks?.[index]?.floors?.reduce(
            (floorSum, floor) =>
                floorSum +
                (floor?.rooms?.reduce(
                    (roomSum, room) => roomSum + (room?.state === "active" ? 1 : 0),
                    0
                ) || 0),
            0
        ),
        inactive: blocks?.[index]?.floors?.reduce((sum, floor) => sum + floor?.rooms?.reduce((roomSum, item) => roomSum + (item?.state === 'inactive' && item?.connected ? 1 : 0), 0), 0),
        maintenance: blocks?.[index]?.floors?.reduce((sum, floor) => sum + floor?.rooms?.reduce((roomSum, item) => roomSum + (item?.state === 'maintenance' || !item?.connected ? 1 : 0), 0), 0),
    };
    return (
        <div className='w-full h-[calc(100%-200px)] p-[20px] scrollbar-hide flex flex-col gap-4'>
            <div className='h-[calc(100%-30px)]'>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Maintenance Dashboard</h1>
                    <p className="text-gray-600">Monitor and manage building blocks, floors, and rooms</p>
                </div>

                {!loaders.getLoading && blocks?.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg max-w-md'>
                            <div className='text-red-600 text-xl mb-2'>⚠️</div>
                            <h3 className='text-lg font-semibold text-red-800 mb-2'>No Data Available</h3>
                            <p className='text-red-700 mb-4'>
                                Unable to load dashboard blocks. This might be due to a connection issue or no blocks added.
                            </p>
                            <Button
                                onPress={() => {
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 300);
                                }}
                                radius='md'
                                color='danger'
                                className='px-4 py-2 transition-colors'
                            >
                                Refresh Page
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <SwiperComponent
                            loading={loaders.getLoading}
                            blocks={blocks}
                        onClick={e => setIndex(e)}
                        />
                        <div className='py-4 flex flex-col gap-4'>
                            {blocks?.[index]?.floors?.map(item => {
                                const states = {
                                    active: item?.rooms?.reduce((sum, item) => sum + (item?.state === 'active' && item?.status != "disconnected" ? 1 : 0), 0),
                                    inactive: item?.rooms?.reduce((sum, item) => sum + (item?.state === 'inactive' && item?.status != "disconnected" ? 1 : 0), 0),
                                    maintenance: item?.rooms?.reduce((sum, item) => sum + (item?.state === 'maintenance' || item?.status == "disconnected" ? 1 : 0), 0)
                                };
                                return (
                                    <BlockOverview
                                        displayId
                                        loading={loaders.getLoading}
                                        key={item?._id}
                                        blocks={blocks?.[index]}
                                        block={`${blocks?.[index]?.block?.toUpperCase()} - ${item?.block}`}
                                        states={states}
                                        rooms={item?.rooms}
                                        floorId={item?.floorId}
                                        blockId={blocks?.[index]?.blockId}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}