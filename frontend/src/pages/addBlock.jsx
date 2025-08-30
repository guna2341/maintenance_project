import React from 'react';
import { BackArrow, Edit, Plus } from '../assets';
import { AccordianComponent, AddFloor, AddRoomModal, ControlCard, InputComponent } from '../components';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { useNavigate } from 'react-router-dom';

const AddBlockPage = () => {

  const nav = useNavigate();
  const [block, setBlock] = React.useState(
    {
      block: "",
      floors: [
        {
          block: "As",
          rooms: [
            {
              room: "CB 101",
              state: "active"
            },
            {
              room: "CB 201",
              state: "inactive"
            }
          ],
          states: {
            active: 1,
            inactive: 1,
            maintenance: 0
          }
        },
      ],
      states: {
        active: 1,
        inactive: 1,
        maintenance: 0
      }
    }
  );

  const [modal, setModal] = React.useState({
    room: false,
    floor: false
  });

  function handleBack() {
    nav(-1);
  }

  function handleFloor(e) {
    console.log(e);
    setModal(p => ({ ...p, floor: false }));
  }
  function handleRoom(e) {
    console.log(e);
    setModal(p => ({ ...p, room: false }));
  }

  function handleSave() {
    console.log(block);
  }

  return (
    <div className='h-[calc(100%-85px)] pt-10 p-2 px-12 flex flex-col gap-7'>
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
              <div className='flex items-center justify-between'>
                <p className='text-lg font-medium font-poppins text-custom-300'>Block Name <span className='text-danger'>*</span></p>
                <Button
                  color='primary'
                  onPress={handleSave}
                >Save</Button>
              </div>
              <InputComponent
                isRequired
                value={block.block}
                onchange={e => setBlock(p => ({...p,block:e.target.value}))}
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
                onClick={() => setModal(p => ({ ...p, floor: true }))}
              >
                Add Floor
              </Button>
            </div>
            <div className='h-full overflow-auto py-2 scrollbar-thin scrollbar-thumb-custom-300/10 scrollbar-track-transparent'>
              <div className='flex flex-col gap-4'>
                {block?.floors?.map((floor, index) => (
                  <AccordianComponent
                    key={index}
                    index={index}
                    title={
                      <div className='flex px-4 items-center font-medium font-poppins text-custom-300 gap-2 justify-between cursor-pointer'><div>{floor?.block}</div>
                        <div></div>
                        <span className='pb-0.5'>
                        <Edit/>
                        </span>
                      </div>
                    }
                    aria_label={floor?.block}
                    content={
                      <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-between'>
                          <p>Rooms</p>
                          <Button color='primary' startContent={<Plus />} onPress={() => setModal(p => ({ ...p, room: true }))}>Add Room</Button>
                        </div>
                        <div className='p-2 flex items-center flex-wrap gap-2'>
                          {floor?.rooms?.map((room,index) =>
                          <ControlCard
                              edit
                              state={room?.state}
                              roomName={room?.room}
                            handleClick={e => console.log(e)}
                            />
                          )}
                        </div>
                      </div>
                    }
                  />
                ))}
               
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <AddRoomModal
        isOpen={modal.room}
        onClose={handleRoom}
        handleRoom={handleRoom}
      />
      <AddFloor
        isOpen={modal.floor}
        onClose={handleFloor}
        handleFloor={handleFloor}
      />
    </div>
  );
};

export default AddBlockPage;