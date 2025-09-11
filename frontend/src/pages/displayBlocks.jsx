import React from 'react';
import { Card, CardBody } from '@heroui/card';
import { BlockCard, StateSummary, DisplayHeader } from "../components";
import { Button } from '@heroui/button';
import { Pagination } from "@heroui/pagination";
import { UseDashboardStore, UseEditBlockStore } from '../stores';
import { useNavigate } from 'react-router-dom';
import { addToast } from '@heroui/toast';

const BlocksDashboard = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 6;
    const nav = useNavigate();
    const blocks = UseDashboardStore(e => e.blocks);
    const loaders = UseDashboardStore(e => e.loaders);
  const getBlocks = UseDashboardStore(e => e.getBlocks);

    const filteredBlocks = blocks?.filter(block => {
        const matchesSearch = block?.block?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredBlocks.length / itemsPerPage);
    const currentBlocks = filteredBlocks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const allRooms = blocks
        .flatMap(block => block?.floors || [])
        .flatMap(floor => floor?.rooms || []);

    const states = [
        { key: "total", label: "total", cardName: "Total Blocks", length: blocks.length },
        { key: "active", label: "active", cardName: "Active rooms", length: allRooms.filter(r => r?.state === "active").length },
        { key: "inactive", label: "inactive", cardName: "Inactive rooms", length: allRooms.filter(r => r?.state === "inactive").length },
        { key: "maintenance", label: "maintenance", cardName: "Maintenance rooms", length: allRooms.filter(r => r?.state === "maintenance").length },
    ];

    function handleNavigate(id) {
        nav(`../editBlock/${id}`)
    };

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

    return (
        <div className="h-[calc(100%-240px)] bg-white p-2">
            <div className="max-w-7xl mx-auto h-full">
                <DisplayHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={() => nav("../addBlock")}
                />

{!loaders.getLoading && blocks.length == 0 ? 
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
                :
                <div className='h-full'>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {states?.map(item => (
                        <StateSummary
                            loading={loaders.getLoading}
                            key={item.key}
                            label={item.label}
                            cardName={item.cardName}
                            length={item.length}
                        />
                    ))}
                </div>
                {!loaders.getLoading && filteredBlocks?.length === 0 ? (
                    <NoSearch />
                ) : (
                    <div className='h-full  flex flex-col gap-4 justify-between'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loaders.getLoading ?
                                Array(6).fill(null).map((_, index) => (
                                    <BlockCard key={index} loading={loaders.getLoading} />
                                ))
                                :
                                currentBlocks.map((block, index) => {
                                    const blockStates = {
                                        active: block?.floors?.reduce((sum,floor) => sum + floor?.rooms?.reduce((roomSum,room) => roomSum + (room?.state === "active" ? 1 : 0), 0), 0),
                                        inactive: block?.floors?.reduce((sum, floor) => sum + floor?.rooms?.reduce((roomSum, room) => roomSum + (room?.state === "inactive" ? 1 : 0), 0), 0),
                                        maintenance: block?.floors?.reduce((sum, floor) => sum + floor?.rooms?.reduce((roomSum, room) => roomSum + (room?.state === "maintenance" ? 1 : 0), 0), 0),
                                    };
                                    return(
                                    <BlockCard key={index} block={block?.block} states={blockStates} loading={loaders.getLoading} handleClick={() => handleNavigate(block._id)} />
                                )})}
                        </div>
                        {totalPages > 1 && (
                            <div className="flex justify-center">
                                <Pagination
                                    total={totalPages}
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                    color="primary"
                                />
                            </div>
                        )}
                    </div>
                )}
                </div>
}
            </div>

        </div>
        
    );
 
};

export default BlocksDashboard;


const NoSearch = () => {
    return (
        <Card className="w-full">
            <CardBody className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mt-4">No blocks found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </CardBody>
        </Card>
    )
}