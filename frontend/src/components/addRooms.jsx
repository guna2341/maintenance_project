import { Plus } from "../assets";
import { Button } from "@heroui/button";
import { ControlCard } from "./controlCard";
import { cn } from "@heroui/theme";

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
                    floor?.rooms?.map((room, index) =>(
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className={cn("text-sm",{
                                    "text-success": room.state == "active" && room.status=="disconnected",
                                    "text-danger": room.state == "inactive" && room.status=="disconnected",
                                    "text-warning": room.status=="disconnected" || !room.status
                                })}
                            >ROOM ID: {room?.roomId}</div>
                        <ControlCard
                            key={index}
                            edit
                            connected={room?.status == "connected" ? true : false}
                            state={room?.state}
                            roomName={room?.room}
                            handleClick={() => setRoom(p => ({ ...p, roomId: index, floorId, room: true, roomName: room?.room, issue: room?.issue, state: room?.state, room_Id:room?.roomId }))}
                            />
                            </div>
                    )
                    )}
            </div>
        </div>
    )
};
