import { Button } from "@heroui/button";
import { ControlCard } from "./controlCard";
import { Plus } from "../assets";

export const AddRooms = ({ setRoom, floor, floorId, loading }) => {

    if (floor?.rooms?.length === 0) {
        return (
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-base font-medium text-gray-800 pl-4.5">Rooms</p>
                    <Button
                        color="primary"
                        startContent={<Plus className="w-4 h-4" />}
                        isLoading={loading}
                        onPress={() => setRoom((p) => ({ ...p, room: true, floorId }))}
                    >
                        Add Room
                    </Button>
                </div>

                <p className="text-lg px-1 text-gray-500 italic font-poppins text-center">No Rooms Added Yet</p>
            </div>

        );
    }

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between'>
                <p className='pl-4.5'>Rooms</p>
                <Button color='primary' startContent={<Plus />} isLoading={loading} onPress={() => setRoom(p => ({ ...p, room: true, floorId }))}>Add Room</Button>
            </div>
            <div className='p-2 flex items-center flex-wrap gap-2 pl-4.5'>
                {loading ?
                    Array(3).fill("").map((_, index) =>
                        <ControlCard
                            key={index}
                            edit
                            loading={loading}
                        />)

                    :
                    floor?.rooms?.map((room, index) =>
                        <ControlCard
                            key={index}
                            edit
                            state={room?.state}
                            roomName={room?.room}
                            handleClick={() => setRoom(p => ({ ...p, roomId: index, floorId, room: true, roomName: room?.room, issue: room?.issue, state:room?.state }))}
                        />
                    )}
            </div>
        </div>
    )
};
