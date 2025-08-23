import React from 'react'
import { Analytics, BlockOverview, DashboardHeader } from '../components'
import { blocks } from '../utils';
import { SwiperComponent } from '../components/swiper';

export const Dashboard = () => {
  const [search, setSearch] = React.useState("");
  const [filteredBlock, setFilteredBlock] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const [index,setIndex] = React.useState(0);

  React.useEffect(() => {
    const filter = blocks.filter(item => item.block.toLowerCase().includes(search.toLowerCase()));
    setFilteredBlock(filter);
  }, [search, setSearch]);


  return (
    <div className='w-full h-full p-[50px] pt-4 flex flex-col gap-4 '>
      <div className='h-[calc(100%-30px)]'>
        <div>
          <DashboardHeader
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div>
          <SwiperComponent
            blocks={filteredBlock}
            onClick={e => setIndex(e)}
          />
        </div>

        <div className={`flex h-full gap-5 items-stretch mt-2`}
         >
          <div className="flex-3 flex flex-col gap-10"
            style={{ height: height > 0 ? `${height}px` : 'auto' }}
          >
            <div className="flex-1 flex flex-col gap-10 pb-1 overflow-y-auto scrollbar-thin scrollbar-thumb-custom-300/10 scrollbar-track-transparent">
              {blocks[index].floors.map(item => (
                <BlockOverview
                  key={item?.id}
                  block={`${blocks[index].block.toUpperCase()} - ${item?.block}`}
                  states={blocks[index]?.states}
                  rooms={item?.rooms}
                />
              ))}
            </div>
          </div>

          <div className="flex-1.5 max-w-[400px] flex flex-col">
            <Analytics
              states={blocks[index]?.states}
              block={blocks[index]}
              onHeightChange={e => setHeight(e)} />
          </div>
        </div>
      </div>
    </div>
  )
}