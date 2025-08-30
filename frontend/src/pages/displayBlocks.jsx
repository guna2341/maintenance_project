import React, { useState } from 'react';
import { Card, CardBody } from '@heroui/card';
import {Select,SelectItem} from "@heroui/select"
import { InputComponent, BlockCard, StateSummary } from "../components";
import { Button } from '@heroui/button';
import { Pagination } from "@heroui/pagination";
import { Chip } from '@heroui/chip';
import { UseDashboardStore } from '../stores';
import { addToast } from '@heroui/toast';

const blocks = [
    {
        id: "1",
        block: "Sunflower block",
        states: {
            active: 10,
            inactive: 11,
            maintenance: 3
        }
    },
    {
        id: "2",
        block: "Mechanical block",
        states: {
            active: 15,
            inactive: 8,
            maintenance: 2
        }
    },
    {
        id: "3",
        block: "Administrative block",
        states: {
            active: 12,
            inactive: 6,
            maintenance: 4
        }
    },
    {
        id: "4",
        block: "Research block",
        states: {
            active: 18,
            inactive: 4,
            maintenance: 1
        }
    },
    {
        id: "5",
        block: "Library block",
        states: {
            active: 14,
            inactive: 9,
            maintenance: 2
        }
    },
    {
        id: "6",
        block: "Cafeteria block",
        states: {
            active: 8,
            inactive: 12,
            maintenance: 5
        }
    },
    {
        id: "7",
        block: "Sports complex",
        states: {
            active: 6,
            inactive: 8,
            maintenance: 3
        }
    },
    {
        id: "8",
        block: "Hostel block",
        states: {
            active: 22,
            inactive: 15,
            maintenance: 8
        }
    }
];

const BlocksDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const blocks = UseDashboardStore(e => e.blocks);
    const states = UseDashboardStore(e => e.states);

    const filteredBlocks = blocks.filter(block => {
        const matchesSearch = block.block.toLowerCase().includes(searchTerm.toLowerCase());
        let matchesStatus = true;
        if (statusFilter !== 'all') {
            matchesStatus = block.states[statusFilter] > 0;
        }
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredBlocks.length / itemsPerPage);
    const currentBlocks = filteredBlocks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto h-full">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">College Blocks</h1>
                    <p className="text-gray-600 mt-2">Manage and monitor all blocks in the college</p>
                </header>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <InputComponent
                        placeholder="Search blocks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        // startContent={<SearchIcon className="text-gray-400" />}
                        className="w-full md:max-w-xs"
                    />

                 

                    <div className="ml-auto">
                        <Button color="primary" className="hidden md:flex">
                            Add New Block
                        </Button>
                    </div>
                </div>


                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <StateSummary
                        key={"total"}
                        label={"total"}
                        cardName="Total Blocks"
                        length={blocks.length}
                    />
                   
                    <StateSummary
                        key={"active"}
                        label={"active"}
                        cardName={"Active rooms"}
                        length={blocks.reduce((sum, block) => sum + block.states.active, 0)}
                    />
                    <StateSummary
                        key={"inactive"}
                        label={"inactive"}
                        cardName={"Inactive rooms"}
                        length={blocks.reduce((sum, block) => sum + block.states.inactive, 0)}
                    />
                    <StateSummary
                        key={"maintenance"}
                        label={"maintenance"}
                        cardName={"Maintenance rooms"}
                        length={blocks.reduce((sum, block) => sum + block.states.maintenance, 0)}
                    />
                </div>

                {/* Blocks Grid */}
                {filteredBlocks.length === 0 ? (
                   <NoSearch/>
                ) : (
                    <div className='h-[calc(100%-300px)] flex flex-col justify-between'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {currentBlocks.map((block,index) => (
                                <BlockCard key={index} block={block.block} states={block.states} />
                            ))}
                        </div>

                        {/* Pagination */}
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