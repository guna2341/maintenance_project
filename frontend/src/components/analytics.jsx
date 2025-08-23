import React from 'react'
import { PieChart } from './pieChart'
import { AlertCard } from './alertCard'
import { RoomStatus } from './roomStatus';

export const Analytics = ({
  onHeightChange,
  states,
  block,
  rooms = []
 }) => {
  const analyticsRef = React.useRef(null);
  
  React.useEffect(() => {
    const updateHeight = () => {
      if (analyticsRef.current) {
        const currentHeight = analyticsRef.current.offsetHeight;
        if (onHeightChange) {
          onHeightChange(currentHeight);
        }
      }
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    if (analyticsRef.current) {
      resizeObserver.observe(analyticsRef.current);
    }

    updateHeight();

    return () => {
      resizeObserver.disconnect();
    };
  }, [onHeightChange]);

  return (
    <div className='pb-2 h-full'>
      <div
        ref={analyticsRef}
        className='w-full h-full flex flex-col border border-black/15 bg-custom-100 p-2.5 rounded-lg'
        style={{ maxHeight: '100%' }}
      >
        <div className='text-center w-full font-poppins font-medium text-base mb-2.5 flex-shrink-0'>
          Analytics
        </div>

        <div className='flex-1 h-fit flex flex-col gap-2.5 overflow-x-hidden min-h-0 scrollbar-hide'>
          <div className='w-full bg-white py-3.5 font-poppins font-normal text-[14px] text-custom-300 rounded-lg border border-black/15 flex-shrink-0 pb-2'>
            <div className='mb-3 px-2.5 text-base'>Overall Summary</div>
            <div className='h-[150px] w-full'>
              <PieChart
                active={states?.active}
                inactive={states?.inactive}
                maintenance={states?.maintenance}
              />
            </div>
          </div>

          <div className='w-full flex flex-col gap-2.5 pb-1'>
            <AlertCard
              block={block}
            />
            <RoomStatus
            block={block} />
          </div>
        </div>
      </div>
    </div>
  )
}