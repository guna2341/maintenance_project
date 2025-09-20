import React from 'react';
import { Button } from '@heroui/button';
import { addToast } from "@heroui/toast";
import { Card, CardBody } from '@heroui/card';
import { DeleteModal } from '../components/deleteModal';
import { useNavigate, useParams } from 'react-router-dom';
import { BackArrow, Delete, Edit, Plus } from '../assets';
import { BlockDeleteModal } from '../components/blockDeleteModal';
import { UseDashboardStore, UseEditBlockStore } from '../stores';
import { AccordianComponent, AddFloor, AddRoomModal, AddRooms, InputComponent } from '../components';

export const EditBlockPage = () => {

  const nav = useNavigate();

  const { id } = useParams();

  const blocks = UseDashboardStore(e => e.blocks);
  const loaders = UseDashboardStore(e => e.loaders);
  const loading = UseEditBlockStore(e => e.loading);
  const getBlocks = UseDashboardStore(e => e.getBlocks);
  const editBlock = UseEditBlockStore(e => e.editBlock);
  const deleteBlock = UseEditBlockStore(e => e.deleteBlock);
  const deleteLoading = UseEditBlockStore(e => e.deleteLoading);

  const [err, setErr] = React.useState("");
  const [block, setBlock] = React.useState();
  const [deleted, setDeleted] = React.useState(false);
  const [deleteBlockModel, setDeleteBlockModel] = React.useState(false);
  const [floor, setFloor] = React.useState({ id: -1, floor: false, floorName: "", floor_Id: "" });
  const [deleteModal, setDeleteModal] = React.useState({ delete: false, floorId: -1, type: "floor" });
  const [room, setRoom] = React.useState({ roomId: -1, floorId: -1, room: false, roomName: "", issue: "", state: "active", room_Id:"" });

  React.useEffect(() => {
    const currentBlock = blocks.find(item => item._id === id);
    setBlock(currentBlock ?? []);
  }, [blocks]);

  function handleBack() {
    nav("../displayBlocks");
  }

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

  async function handleDelete() {
    const response = await deleteBlock(id);
    if (response.state) {
      toast("Success", response?.message, "success");
      setDeleted(true);
      setDeleteBlockModel(false);
    }
    else {
      toast("Error", response?.message, "danger")
    }
  }

  function handleNewRoom(data) {
    const newBlock = {
      ...block,
      floors: block.floors.map((floor, fIndex) => {
        if (fIndex === room.floorId) {
          return {
            ...floor,
            rooms: [...floor.rooms, { roomId:data.room_Id,room: data.room, state: data?.state || "active", issue: data?.issue }]
          };
        }
        return floor;
      })
    };
    setBlock(newBlock);
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
                  roomId:data.room_Id,
                  room: data.room,
                  state: data?.state || "inactive",
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
    console.log
    const newFloor = {
      block: e.floorName,
      floorId:e.floor_Id,
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
            block: e.floorName,
            floorId:e.floor_Id
          }
        }
        else {
          return item;
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
    if (!block.blockId) {
      setErr("Please enter a blockId");
      return;
    }
    if (!block.block) {
      setErr("Please enter a block");
      return;
    }
    const response = await editBlock(block);
    if (response?.state) {
      toast("Success", response?.message, "success")
    }
    else {
      toast("Error", response?.message, "danger")
    }
  }

  function toast(title, description, color) {
    addToast({
      title,
      description,
      variant: "flat",
      color
    })
  }

  return (
    <div className='h-full pt-10 p-2 px-12 flex flex-col gap-7 font-poppins'>
      <div className='flex items-center gap-8'>
        <span className='cursor-pointer' onClick={handleBack}>
          <BackArrow />
        </span>
        <h1 className='text-xl font-poppins font-medium text-center text-custom-300'>Edit Block</h1>
      </div>
      <Card className='h-full'>
        {loaders.getLoading ?
          <CardBody>
            <div className='p-4 rounded-lg flex flex-col gap-4 h-full'>

              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between w-full'>
                  <p className='text-lg font-medium font-poppins text-custom-300'>Block Name <span className='text-danger'>*</span></p>
                  <div className='flex items-center gap-2'>
                    <Button color='danger' variant='bordered'>Delete</Button>
                    <Button
                      color='primary'
                      isLoading={loading}
                    >Save</Button>
                  </div>
                </div>
                <InputComponent
                  isRequired
                  autofocus
                  isReadOnly={loaders.getLoading}
                  value={"loading..."}
                  placeholder={"Eg:CB101"}
                  classname={{
                    inputWrapper: "bg-white border border-gray-300",
                  }}
                />
              </div>
              <div className='h-full overflow-auto py-2 scrollbar-thin scrollbar-thumb-custom-300/10 scrollbar-track-transparent'>
                <div className='flex flex-col gap-4'>
                  {Array(3).fill("").map((floor, index) => (
                    <AccordianComponent
                      key={index}
                      loading={loaders.getLoading}
                      index={index}
                      title={
                        <div className='flex px-4 items-center font-medium font-poppins text-custom-300 gap-2 justify-between cursor-pointer'><div>{floor?.block}</div>
                          <div></div>
                          <div className='flex items-center gap-3'>
                            <span>
                              <Edit />
                            </span>
                            <span>
                              <Delete />
                            </span>
                          </div>
                        </div>
                      }
                      aria_label={floor?.block}
                      content={
                        <AddRooms setRoom={setRoom} setDelete={setDeleteModal} floor={floor} floorId={index} loading={loaders.getLoading} />
                      }
                    />

                  ))}
                </div>
              </div>
            </div>
          </CardBody> :
          <CardBody
            className='bg-custom-150/50 h-full'
          >
            {deleted ? <div className="flex flex-col h-full w-full items-center justify-center bg-gray-100 rounded-lg px-4">
              <div className="bg-white flex flex-col items-center p-6 rounded-2xl gap-6 border border-gray-200 shadow-sm max-w-sm w-full">
                <div className="text-xl font-semibold text-danger text-center">
                  Block Deleted Successfully
                </div>
                <Button className="bg-danger text-white px-6 py-2 rounded-lg transition duration-300"
                  onPress={() => nav('../displayBlocks')}
                >
                  Go Back
                </Button>
              </div>
            </div>
              :
              <div className='p-4 rounded-lg flex flex-col gap-4 h-full'>
                <div className='flex flex-col gap-2'>
                  <div className='flex items-center w-full justify-between'>
                  <p className='text-lg font-medium font-poppins text-custom-300'>Block ID <span className='text-danger'>*</span></p>
                  <div className='flex items-center gap-2'>
                    <Button color='danger' variant='bordered'
                      loading={deleteLoading}
                      onPress={() => setDeleteBlockModel(true)}
                    >Delete</Button>
                    <Button
                      color='primary'
                      isLoading={loading}
                      onPress={handleSave}
                    >Save</Button>
                  </div>
                  </div>
                  <InputComponent
                    isRequired
                    autofocus
                    value={block?.blockId}
                    onchange={e => setBlock(p => ({ ...p, blockId: e.target.value }))}
                    placeholder={"Eg:CB101"}
                    classname={{
                      inputWrapper: "bg-white border border-gray-300",
                    }}
                  />
                  <div className='flex items-center justify-between w-full'>
                    <p className='text-lg font-medium font-poppins text-custom-300'>Block Name <span className='text-danger'>*</span></p>
                    
                  </div>
                  <InputComponent
                    isRequired
                    autofocus
                    value={block?.block}
                    onchange={e => setBlock(p => ({ ...p, block: e.target.value }))}
                    placeholder={"Eg:CB101"}
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
                {block?.floors?.length == 0 || blocks.length == 0 ?
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
                                <span onClick={() => setFloor(p => ({ ...p, floor: true, id: index, floor_Id:floor.floorId,
                               floorName: floor.block }))}>
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
            }
          </CardBody>
        }
      </Card>
      <AddRoomModal
        isOpen={room.room}
        roomName={room.roomName}
        room_Id={room.room_Id}
        roomIssue={room?.issue}
        roomState={room?.state}
        edit={room.roomId != -1}
        onClose={() => setRoom(p => ({ ...p, room: false, roomId: -1, floorId: -1, roomName: "", issue: "", room_Id:"" }))}
        handleConfirm={handleRoom}
      />
      <AddFloor
        isOpen={floor.floor}
        floor_Id={floor.floor_Id}
        floorName={floor.floorName}
        edit={floor.id != -1}
        onClose={() => setFloor(p => ({ ...p, floor: false, id: -1, floorName: "", floor_Id:"" }))}
        handleFloor={handleFloor}
      />
      <DeleteModal
        isOpen={deleteModal.delete}
        type={deleteModal.type}
        onFloorDelete={deleteFloors}
        onClose={() => setDeleteModal(p => ({ ...p, delete: false, floorId: -1, roomId: -1 }))}
      />
      <BlockDeleteModal
        isOpen={deleteBlockModel}
        loading={deleteLoading}
        onCancel={() => setDeleteBlockModel(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};


