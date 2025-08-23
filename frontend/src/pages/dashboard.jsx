import React from 'react'
import { Analytics, BlockCard, BlockOverview, DashboardHeader } from '../components'
import { blocks } from '../utils';
import { SwiperComponent } from '../components/swiper';

export const Dashboard = () => {

  const [search, setSearch] = React.useState("");
  const [filteredBlock, setFilteredBlock] = React.useState([]);

  React.useEffect(() => {
    const filter = blocks.filter(item => item.block.toLowerCase().includes(search.toLowerCase()));
    setFilteredBlock(filter);
  }, [search, setSearch]);

  return (
    <div className='w-full h-full p-[50px] pt-4 flex flex-col gap-4'>
      
      <div className='h-[calc(100%-30px)]'>
        <div>
          <DashboardHeader
          onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div>
          <SwiperComponent
          blocks={filteredBlock}
          />
        </div>

        <div className='flex gap-5 h-[calc(100%-224px)]'>

          <div className='w-full h-full flex-3 flex flex-col items-center gap-10'>
            <BlockOverview/>
            {/* <BlockOverview/> */}
          </div>

          <div className='w-full flex-1 h-fit'>
        <Analytics/>
          </div>
          
        </div>

      </div>

    </div>
  )
}
