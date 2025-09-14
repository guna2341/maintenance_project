import React from 'react';
import { Button } from '@heroui/button';
import { addToast } from "@heroui/toast";
import { Card, CardBody } from '@heroui/card';
import { useNavigate } from 'react-router-dom';
import { BackArrow, Delete, Edit, Plus } from '../assets';
import { UseAddBlocksStore, UseDashboardStore } from '../stores';
import { AccordianComponent, AddFloor, AddRoomModal, AddRooms, InputComponent, DeleteModal } from '../components';

export const AddBlockPage = () => {

  const nav = useNavigate();

  const loaders = UseAddBlocksStore(e => e.loaders);
  const addBlock = UseAddBlocksStore(e => e.addBlocks);
  const getBlocks = UseDashboardStore(e => e.getBlocks);

  const [err, setErr] = React.useState("");
  const [block, setBlock] = React.useState({ block: "", floors: [] });
  const [floor, setFloor] = React.useState({ id: -1, floor: false, floorName: "" });
  const [deleteModal, setDeleteModal] = React.useState({ delete: false, floorId: -1, type: "floor" });
  const [room, setRoom] = React.useState({ roomId: -1, floorId: -1, room: false, roomName: "", issue: "", state: "active" });


  function handleBack() {
    nav(-1);
  }
  function handleNewRoom(data) {
    const newBlock = {
      ...block,
      floors: block.floors.map((floor, fIndex) => {
        if (fIndex === room.floorId) {
          return {
            ...floor,
            rooms: [...floor.rooms, { room: data.room, state: data?.state || "active", issue: data?.issue }]
          };
        }
        return floor;
      })
    };
    setBlock(newBlock);
    console.log(newBlock)
    setRoom({ room: false, floorId: -1, roomId: -1 });
  }
  function handleEditRoom(data) {
    const newBlock = {
      ...block,
      floors: block.floors.map((floor, index) => {
        if (index === room.floorId) {
          return {
            ...floor,
            rooms: floor.rooms.map((item, index) => {
              if (index === room.roomId) {
                return {
                  ...item,
                  room: data.room,
                  state: data?.state || "active",
                  issue: data?.issue
                }
              }
              else {
                return item;
              }
            })
          }
        }
        else {
          return floor;
        }
      })
    }
    setBlock(newBlock);
    setRoom(p => ({ ...p, roomId: -1, floorId: -1 }))
  }
  function handleNewFloor(e) {
    const newFloor = {
      block: e,
      rooms: []
    };
    const newBlock = {
      ...block,
      floors: [...block.floors, newFloor]
    }
    setBlock(newBlock);
    setFloor(p => ({ ...p, floor: false, id: -1 }));
  }
  function handleEditFloor(e) {
    const newBlock = {
      ...block,
      floors: block.floors.map((item, index) => {
        if (index == floor.id) {
          return {
            ...item,
            block: e,
          }
        }
        else {
          return floor;
        }
      })
    };
    setBlock(newBlock);
  }
  function handleFloor(e) {
    if (floor.id == -1) {
      handleNewFloor(e);
      return;
    }
    handleEditFloor(e);
    setFloor(p => ({ ...p, floor: false, id: -1 }));
  }
  function handleRoom(e) {

    if (e.type == "delete") {
      deleteRooms();
      return;
    }
    if (room.roomId == -1) {
      handleNewRoom(e);
      return;
    }
    handleEditRoom(e);
    setRoom(p => ({ ...p, room: false, roomId: -1, floorId: -1 }));
  }
  function deleteRooms() {
    console.log(room)
    const newBlock = {
      ...block,
      floors: block.floors.map((floor, index) => {
        if (index == room.floorId) {
          return {
            ...floor,
            rooms: floor.rooms.filter((_, index) => index != room.roomId)
          }
        }
        else {
          return floor;
        }
      })
    };
    setRoom(p => ({ ...p, room: false, roomId: -1, floorId: -1 }));
    setBlock(newBlock);
  }
  function deleteFloors() {
    const newBlock = {
      ...block,
      floors: block.floors.filter((_, index) => index !== deleteModal.floorId)
    };
    setDeleteModal(p => ({ ...p, delete: false, type: "", floorId: -1, roomId: -1 }));
    setBlock(newBlock);
  }
  async function handleSave() {
    if (!block.block) {
      setErr("Please enter a block");
      return;
    }
    const response = await addBlock(block);
    if (response?.state) {
      toast("Success", response?.message || "Block added successfully", "success")
    }
    else {
      toast("Error", response?.message || "Some error occured", "danger")
    }
  }

  React.useEffect(() => {
    if (err && block.block.trim()) {
      setErr("");
    }
  }, [block.block]);

  function toast(title, description, color) {
    addToast({
      title,
      description,
      variant: "flat",
      color
    })
  }

  React.useEffect(() => {
    async function getData() {
      const response = await getBlocks();
      if (!response.state) {
        toast('Some Error Occured', response.message, 'danger');
        return;
      }
      if (response.data) {
        if (response.data.length === 0) {
          toast(
            'No Data Found',
            'No blocks available. Please refresh the page to try again.',
            'warning'
          );
        }
      }
    }
    getData();
  }, []);

  return (
    <div className='h-full pt-10 p-2 px-12 flex flex-col gap-7 font-poppins'>
      <div className='flex items-center gap-8'>
        <span className='cursor-pointer' onClick={handleBack}>
          <BackArrow />
        </span>
        <h1 className='text-xl font-poppins font-medium text-center text-custom-300'>Add Block</h1>
      </div>
      <Card className='h-full'>
        <CardBody
          className='bg-custom-150/50 h-full'
        >
          <div className='p-4 rounded-lg flex flex-col gap-4 h-full'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between w-full'>
                <p className='text-lg font-medium font-poppins text-custom-300'>Block Name <span className='text-danger'>*</span></p>
                <Button
                  color='primary'
                  onPress={handleSave}
                  isLoading={loaders.addLoading}
                >Save</Button>
              </div>
              <InputComponent
                isRequired
                autofocus
                isInvalid={!!err}
                errorMessage={err}
                value={block.block}
                onchange={e => setBlock(p => ({ ...p, block: e.target.value }))}
                placeholder={"Eg:As Block"}
                classname={{
                  inputWrapper: "bg-white border border-gray-300",
                }}
              />
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-lg font-medium font-poppins text-custom-300'>Floors</p>
              <Button
                color='primary'
                startContent={<Plus />}
                onClick={() => setFloor(p => ({ ...p, floor: true }))}
              >
                Add Floor
              </Button>
            </div>
            {block.floors.length == 0 ?
              <div className="text-center text-gray-500 border border-black/15 bg-white rounded-lg h-full flex justify-center items-center italic text-xl font-semibold p-4">
                No Floors Added Yet
              </div>

              :
              <div className='h-full overflow-auto py-2 scrollbar-thin scrollbar-thumb-custom-300/10 scrollbar-track-transparent'>
                <div className='flex flex-col gap-4'>
                  {block?.floors?.map((floor, index) => (
                    <AccordianComponent
                      key={index}
                      index={index}
                      title={
                        <div className='flex px-4 items-center font-medium font-poppins text-custom-300 gap-2 justify-between cursor-pointer'><div>{floor?.block}</div>
                          <div></div>
                          <div className='flex items-center gap-3'>
                            <span onClick={() => setFloor(p => ({ ...p, floor: true, id: index, floorName: floor.block }))}>
                              <Edit />
                            </span>
                            <span onClick={() => setDeleteModal(p => ({ ...p, delete: true, floorId: index, type: "floor" }))}>
                              <Delete />
                            </span>
                          </div>
                        </div>
                      }
                      aria_label={floor?.block}
                      content={
                        <AddRooms setRoom={setRoom} setDelete={setDeleteModal} floor={floor} floorId={index} />
                      }
                    />
                  ))}

                </div>
              </div>
            }
          </div>
        </CardBody>
      </Card>
      <AddRoomModal
        isOpen={room.room}
        roomName={room.roomName}
        roomIssue={room?.issue}
        roomState={room?.state}
        edit={room.roomId != -1}
        onClose={() => setRoom(p => ({ ...p, room: false, roomId: -1, floorId: -1, roomName: "", issue: "", state: "active" }))}
        handleConfirm={handleRoom}
      />
      <AddFloor
        isOpen={floor.floor}
        floorName={floor.floorName}
        edit={floor.id != -1}
        onClose={() => setFloor(p => ({ ...p, floor: false, id: -1, floorName: "" }))}
        handleFloor={handleFloor}
      />
      <DeleteModal
        isOpen={deleteModal.delete}
        type={deleteModal.type}
        onFloorDelete={deleteFloors}
        onClose={() => setDeleteModal(p => ({ ...p, delete: false, floorId: -1, roomId: -1 }))}
      />
    </div>
  );
};


