import React, { useState } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Select, SelectItem } from "@heroui/select"
import { InputComponent, BlockCard, StateSummary, DisplayHeader } from "../components";
import { Button } from '@heroui/button';
import { Pagination } from "@heroui/pagination";
import { Chip } from '@heroui/chip';
import { UseDashboardStore } from '../stores';
import { addToast } from '@heroui/toast';
import { Search } from '../assets';

const BlocksDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const blocks = UseDashboardStore(e => e.blocks);
    const loaders = UseDashboardStore(e => e.loaders);

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

    const states = [
        {
            key: "total", label: "total", cardName: "Total Blocks", length: blocks.length
        },
        {
            key: "active", label: "active", cardName: "Active rooms", length: blocks.reduce((sum, block) => sum + block.states.active, 0)
        },
        {
            key: "inactive", label: "inactive", cardName: "Inactive rooms", length: blocks.reduce((sum, block) => sum + block.states.inactive, 0)
        },
        {
            key: "maintenance", label: "maintenance", cardName: "Maintenance rooms", length: blocks.reduce((sum, block) => sum + block.states.maintenance, 0)
        }
    ];

    return (
        <div className="min-h-[calc(100%-80px)] bg-white p-2 pt-5">
            <div className="max-w-7xl mx-auto h-full">

                <DisplayHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={() => console.log("Click")}
                />

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {states.map(item => (
                        <StateSummary
                            loading={loaders.getLoading}
                            key={item.key}
                            label={item.label}
                            cardName={item.cardName}
                            length={blocks.length}
                        />
                    ))}

                </div>

                {!loaders.getLoading && filteredBlocks.length === 0 ? (
                    <NoSearch />
                ) : (
                    <div className='h-[calc(100%-250px)] flex flex-col justify-between'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {loaders.getLoading ?
                                Array(6).fill(null).map((_, index) => (
                                    <BlockCard key={index} loading={loaders.getLoading} />
                                ))
                                :
                                currentBlocks.map((block, index) => (
                                    <BlockCard key={index} block={block.block} states={block.states} loading={loaders.getLoading} />
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