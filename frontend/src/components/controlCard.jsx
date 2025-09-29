import { Switch } from '@heroui/switch';
import { cn } from '@heroui/theme';
import React from 'react';
import { ControlModal } from './controlModal';
import { Skeleton } from '@heroui/skeleton';
import { UseDashboardStore, UseSwitchStore } from '../stores';

export const ControlCard = ({
  state,
  roomName,
  loading,
  handleClick,
  connected,
  edit
}) => {
  const [switchState, setSwitchState] = React.useState(state === "active" ? true : false);
  const [open, setOpen] = React.useState(false);
  const loaders = UseDashboardStore(e => e.loaders);
  const sl = UseSwitchStore(e => e.loading);

  React.useEffect(() => {
    if (!sl) {
      setSwitchState(state === "active");
    }
  }, [state, sl]);

  React.useEffect(() => {
    if (!sl) {
        setOpen(false);
    };
  }, [sl]);

  async function handleSwitch() {
    if (edit) {
      handleClick();
      return;
    }
    if (!loading && connected && !edit) {
      setOpen(true);
    }
  }

  async function handleClose(e) {
    if (e === "confirm") {
      try {
        await handleClick(switchState ? "active" : "inactive");
      } catch (err) {
        console.log(err);
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  }
  return (
    <div
      onClick={handleSwitch}
      className={cn('border rounded-lg bg-white flex flex-col gap-4 justify-between items-center w-full w-[179px] py-2.5 px-3.5 cursor-pointer', {
        'border-custom-500': !switchState,
        'border-custom-400': switchState,
        "border-custom-200 cursor-auto": !connected
      })}
    >
      <div className='flex items-center w-full'>
        <div className='w-full flex justify-center'>
          <div
            className={cn('border border-custom-400 rounded w-fit px-5 text-center items-center font-poppins font-normal text-sm', {
              'border-custom-500 text-custom-500': !switchState,
              'border-custom-400 text-custom-400': switchState,
              "border-custom-200 text-custom-200": !connected
            })}
          >
            {loading ? (
              <Skeleton className='w-12 h-4 my-1 rounded-2xl' />
            ) : (
              roomName ? roomName : "Room Name"
            )}
          </div>
        </div>
      </div>

      <Switch
        color={!connected  ? "warning" : "success"}
        isDisabled={loading || !connected}
        isSelected={switchState}
        onChange={handleSwitch}
        classNames={{
          wrapper: `w-[60px] h-[28px] bg-custom-500 group-data-[selected=true]:text-custom-400 group-data-[focus-visible=true]:ring-0 group-data-[focus-visible=true]:border-0 ${(!connected) && "bg-warning"}`,
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
        loading={sl}
        roomName={roomName}
        action={!switchState ? "on" : "off"}
      />
    </div>
  );
};