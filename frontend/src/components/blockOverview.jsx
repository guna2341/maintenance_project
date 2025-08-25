import { StateCard } from './stateCard';
import { OperationCard } from './operationCard';
import { BlockHeader } from './blockHeader';
import { ControlCard } from './controlCard';

export const BlockOverview = (
    {
        rooms,
        block,
        states
    }
) => {

    const keys = ["active", "inactive", "maintenance"];

    return (
        <div className='border w-full border-black/15 border-l-0 bg-custom-100 rounded-lg text-custom-300'>
            <div className='border-l-3 border-custom-200 rounded-[6px] py-2.5 px-6 flex flex-col gap-5'>

                <BlockHeader
                    block={block}
                    states={states}
                />
                <div className='flex items-center gap-4 h-full max-h-[81px]'>
                    {keys.map(item => (
                        <StateCard
                            className={"max-h-[81px] justify-between w-full bg-white"}
                            states={states}
                            item={item}
                            key={item}
                        />
                    ))}
                    <OperationCard
                    value={(states?.active/(states?.active + states?.inactive + states?.maintenance) * 100)}
                    />
                </div>
                <div className='flex flex-col gap-2.5'>
                    <p
                    className='text-custom-300 font-medium font-poppins text-base'
                    >Room Controls</p>

                    <div className='flex flex-wrap items-center gap-2.5 gap-y-4.5 w-full overflow-auto'>
                        {rooms?.map(item => (
                            <ControlCard
                                key={item?.id}
                                state={item?.state}
                                roomName={item?.room}
                            />
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
