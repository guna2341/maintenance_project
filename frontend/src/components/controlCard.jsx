import { Switch } from '@heroui/switch';
import { cn } from '@heroui/theme';
import React from 'react';

export const ControlCard = (
    {
        state = false,
        handleState,
        key
    }
) => {

    const [switchState, setSwitchState] = React.useState(state);

    function handleSwitch() {
        setSwitchState(!switchState);
        handleState(key);
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
        CB104
      </div>
      <Switch
        color="success"
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
    </div>
  )
}
