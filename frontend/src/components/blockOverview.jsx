import { StateCard } from './stateCard';
import { OperationCard } from './operationCard';
import { BlockHeader } from './blockHeader';
import { ControlCard } from './controlCard';
import { addToast } from '@heroui/toast';
import { CopySnippet } from './copySnippet';
import { cn } from '@heroui/theme';
import { UseSwitchStore } from '../stores/switchStore';

export const BlockOverview = (
    {
        rooms,
        block,
        states,
        loading,
        floorId,
        blockId,
        displayId = false
    }
) => {
    const keys = ["active", "inactive", "maintenance"];
    const setSwitchState = UseSwitchStore(e => e.setSwitchState);

    function handleToast(title, message) {
        addToast({
            title: title,
            description: message,
            color: "danger",
        });
    }

    async function handleBlock(roomId, e) {
        const response = await setSwitchState(blockId, floorId, roomId, e);
        if (!response?.state) {
            handleToast(response?.title, response?.message);
        }
    };
    return (
        <div className='border w-full border-black/15 border-l-3 border-l-custom-200 bg-custom-100 rounded-lg text-custom-300'>

            <div className=' rounded-[6px] py-2.5 px-6 flex flex-col gap-5'>
                <BlockHeader
                    loading={loading}
                    block={block}
                    states={states}
                />
                <div className='flex gap-4 h-full max-h-[81px]'>
                    {keys.map(item => (
                        <StateCard
                            loading={loading}
                            className={"max-h-[81px] justify-between w-full bg-white"}
                            states={states}
                            item={item}
                            key={item}
                        />
                    ))}
                    <OperationCard
                        loading={loading}
                        value={(states?.active / (states?.active + states?.inactive + states?.maintenance) * 100)}
                    />
                </div>
                <div className='flex flex-col gap-2.5'>
                    <p
                        className='text-custom-300 font-medium font-poppins text-base'
                    >Room Controls</p>

                    {loading ?
                        <div className='flex flex-wrap items-center gap-2.5 gap-y-4.5 w-full overflow-auto'>
                            {Array(6).fill(null).map((item, index) => (
                                <ControlCard
                                    key={index}
                                    loading={loading}
                                />
                            ))}
                        </div> :
                        <div className='flex flex-wrap items-center gap-2.5 gap-y-4.5 w-full overflow-auto'>
                            {!displayId ?
                                rooms?.map((item, index) => (
                                    <ControlCard
                                        key={index}
                                        connected={item?.status == "connected" ? true : false}
                                        handleClick={(e) => handleBlock(item?.roomId, e)}
                                        loading={loading}
                                        state={item?.state}
                                        roomName={item?.room}
                                    />
                                ))
                                :
                                <div className='flex flex-wrap items-center gap-2.5 w-full overflow-auto'>
                                    {rooms?.map(item => (
                                        <div
                                            className={cn('border border-black/15 rounded-lg bg-white flex flex-col gap-3.5 justify-between items-center w-full max-w-[230px] py-2.5 px-2 cursor-pointer', {
                                                'border-custom-500': item?.state == "inactive",
                                                'border-custom-400': item?.state == "active",
                                                'border-custom-200': item?.status == "disconnected"
                                            })}
                                        >
                                            <div className={cn('border border-black/15 rounded w-fit px-5 py-0.5 text-center items-center font-poppins font-normal text-sm', {
                                                'border-custom-500': item?.state == "inactive",
                                                'border-custom-400': item?.state == "active",
                                                'border-custom-200 text-custom-200': item?.status == "disconnected"
                                            })}>{item?.room}</div>
                                            <CopySnippet text={`${blockId}/${floorId}/${item?.roomId}`} />
                                        </div>
                                    )
                                    )}
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}
