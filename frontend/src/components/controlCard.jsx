import { Switch } from '@heroui/switch';
import { cn } from '@heroui/theme';
import React from 'react';
import { ControlModal } from './controlModal';

export const ControlCard = (
    {
        state = "active",
        handleState,
        key,
        roomName
    }
) => {
    const [switchState, setSwitchState] = React.useState(state === "active" ? true : false);
    const [open,setOpen] = React.useState(false);
  
  function handleSwitch() {
      setOpen(true);
  }
  
  function handleClose(e) {    
    setOpen(false);
    if (e === "confirm") {
      setSwitchState(!switchState);
    }
  }

  return (
    <div
      onClick={handleSwitch}
      className={cn('border rounded-lg bg-white flex flex-col gap-4 justify-between items-center w-full max-w-[179px] py-2.5 px-3.5 cursor-pointer', {
        'border-custom-500': !switchState,
        'border-custom-400': switchState

      })}
    >
      
      <div
        className={cn('border border-custom-400 rounded w-fit px-5 text-center items-center font-poppins font-normal text-sm' ,{
          'border-custom-500 text-custom-500': !switchState,
          'border-custom-400 text-custom-400': switchState
        })}
      >
        {roomName ? roomName : "Room Name"}
      </div>
      <Switch
        color="success"
        disabled={state === "maintenance"}
        isSelected={switchState}
        onValueChange={handleSwitch}
        classNames={{
          wrapper: "w-[60px] h-[28px] bg-custom-500 group-data-[selected=true]:text-custom-400 group-data-[focus-visible=true]:ring-0 ",
          thumb: "group-data-[selected]:group-data-[pressed=true]:ml-7.5 group-data-[pressed=true]:w-5.5 w-5 h-5 group-data-[selected=true]:ms-8",
          startContent: "start-2.5 font-poppins font-normal text-white text-sm",
          endContent: "end-2 font-poppins font-normal text-white text-sm"
        }}
        endContent={<span>OFF</span>}
        size="lg"
        startContent={<span>ON</span>}
      />  
      <ControlModal
        isOpen={open}
        onClose={handleClose}
        roomName={roomName}
        action={!switchState ? "on" : "off"}
      />
    </div>
  )
}
