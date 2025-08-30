import { StateCard } from './stateCard';
import { OperationCard } from './operationCard';
import { BlockHeader } from './blockHeader';
import { ControlCard } from './controlCard';
import { UseDashboardStore } from '../stores';

export const BlockOverview = (
    {
        rooms,
        block,
        states,
        loading,
        floorId,
        blockId
    }
) => {
    const keys = ["active", "inactive", "maintenance"];
    const editState = UseDashboardStore(e => e.editState);
    async function handleBlock(roomId, e) {
        await editState({ roomId, floorId, blockId, state:e });
    }; 
    return (
        <div className='border w-full border-black/15 border-l-0 bg-custom-100 rounded-lg text-custom-300'>
            <div className='border-l-3 border-custom-200 rounded-[6px] py-2.5 px-6 flex flex-col gap-5'>
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
                    value={(states?.active/(states?.active + states?.inactive + states?.maintenance) * 100)}
                    />
                </div>
                <div className='flex flex-col gap-2.5'>
                    <p
                    className='text-custom-300 font-medium font-poppins text-base'
                    >Room Controls</p>
                    {loading ?
                        <div className='flex flex-wrap items-center gap-2.5 gap-y-4.5 w-full overflow-auto'>
                            {Array(6).fill(null).map((item,index) => (
                                <ControlCard
                                    loading={loading}
                                    key={index}
                                   
                                />
                            ))}
                        </div> :
                        <div className='flex flex-wrap items-center gap-2.5 gap-y-4.5 w-full overflow-auto'>
                            {rooms?.map((item,index) => (
                                <ControlCard
                                    handleClick={(e) => handleBlock(item?._id,e)}
                                    loading={loading}
                                    key={index}
                                    state={item?.state}
                                    roomName={item?.room}
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
