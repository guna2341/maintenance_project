import { Switch } from '@heroui/switch';
import { cn } from '@heroui/theme';
import React from 'react';
import { ControlModal } from './controlModal';
import { Skeleton } from '@heroui/skeleton';
import { UseDashboardStore } from '../stores';

export const ControlCard = (
  {
    state,
    roomName,
    loading,
    handleClick,
  }
) => {
  const [switchState, setSwitchState] = React.useState(state === "active" ? true : false);
  const [open, setOpen] = React.useState(false);
  const loaders = UseDashboardStore(e => e.loaders);

  React.useEffect(() => {
    if (!loaders.editLoading) {
      setSwitchState(state === "active");
    }
  }, [state]);

  function handleSwitch() {
    if (!loading && state !== "maintenance") {
      setOpen(true);
    };
  }

  async function handleClose(e) {
    if (e === "confirm") {
      try {
        await handleClick(switchState ? "active" : "inactive");
      if (!loaders.editLoading) {
        setOpen(false);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      setOpen(false);
    }
  };



  return (
    <div
      onClick={handleSwitch}
      className={cn('border rounded-lg bg-white flex flex-col gap-4 justify-between items-center w-full max-w-[179px] py-2.5 px-3.5 cursor-pointer', {
        'border-custom-500': !switchState,
        'border-custom-400': switchState,
        "border-custom-200 cursor-auto": state === "maintenance"
      })}
    >

      <div
        className={cn('border border-custom-400 rounded w-fit px-5 text-center items-center font-poppins font-normal text-sm', {
          'border-custom-500 text-custom-500': !switchState,
          'border-custom-400 text-custom-400': switchState,
          "border-custom-200 text-custom-200": state === "maintenance"
        })}
      > 
        {loading ? <Skeleton
          className='w-12 h-4 my-1 rounded-2xl'
        /> :
          roomName ? roomName : "Room Name"}
      </div>
      <Switch
        color={state === "maintenance" ? "warning" : "success"}
        isDisabled={loading || state === "maintenance"}
        isSelected={switchState}
        onChange={handleSwitch}
         classNames={{
          wrapper: `w-[60px] h-[28px] bg-custom-500 group-data-[selected=true]:text-custom-400 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:border-0 ${state === "maintenance" && "bg-warning"}`,
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
        loading={loaders.editLoading}
        roomName={roomName}
        action={!switchState ? "on" : "off"}
      />
    </div>
  )
}
