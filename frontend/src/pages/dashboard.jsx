import React, { useRef } from 'react';
import { DashboardHeader, SearchNotFound } from '../components';
import { UseDashboardStore } from '../stores';
import { DashboardLayout } from '../layout/dashboardLayout';
import { Button } from '@heroui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToast } from '@heroui/toast';


export const Dashboard = () => {
  const blocks = UseDashboardStore(e => e.blocks);
  const filteredBlocks = UseDashboardStore(e => e.filteredBlocks);
  const setFilter = UseDashboardStore(e => e.setFilter);
  const [search, setSearch] = React.useState('');
  const loaders = UseDashboardStore(e => e.loaders);
  const getBlocks = UseDashboardStore(e => e.getBlocks);

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

  React.useEffect(() => {
    const filter = blocks?.filter(item => item?.block?.toLowerCase().includes(search?.toLowerCase()));
    setFilter(filter);
  }, [blocks, search]);

  return (
    <div className='w-full h-[calc(100%-200px)] p-[20px] pb-2 pt-4 flex flex-col gap-4'>
      <div className='h-[calc(100%-30px)]'>
        <div>
          <DashboardHeader
            loading={loaders.getLoading}
            search={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {!loaders.getLoading && blocks.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-center p-8 bg-red-50 border border-red-200 rounded-lg max-w-md'>
              <div className='text-red-600 text-xl mb-2'>⚠️</div>
              <h3 className='text-lg font-semibold text-red-800 mb-2'>No Data Available</h3>
              <p className='text-red-700 mb-4'>
                Unable to load dashboard blocks. This might be due to a connection issue or server problem.
              </p>
              <Button
                onPress={() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 300);
                }}
                radius='md'
                color='danger'
                className='px-4 py-2 transition-colors'
              >
                Refresh Page
              </Button>
            </div>
          </div>
        ) :

          loaders.getLoading || filteredBlocks.length !== 0 ? (
            <DashboardLayout filteredBlock={filteredBlocks} />
          ) : (
            <div className="w-full flex justify-center mt-8">
              <SearchNotFound />
            </div>
          )
        }

      </div>
    </div>
  )
}