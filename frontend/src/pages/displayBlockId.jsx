import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { UseDashboardStore } from '../stores';

// Custom Copy Component
const CopySnippet = ({ text, className = "" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 ${className}`}>
            <code className="text-sm font-mono text-gray-700 flex-1 mr-2">
                {text}
            </code>
            <button
                onClick={handleCopy}
                className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors"
                title={copied ? "Copied!" : "Copy to clipboard"}
            >
                {copied ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                ) : (
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};

// Skeleton Component
const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 ${className}`}></div>
);

const StateChip = ({ state, issue }) => {
    const getStateColor = (state) => {
        switch (state) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'danger';
            case 'maintenance':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <Chip
                color={getStateColor(state)}
                variant="flat"
                size="sm"
                className="capitalize"
            >
                {state}
            </Chip>
            {issue && (
                <span className="text-xs text-gray-500">{issue}</span>
            )}
        </div>
    );
};

const RoomCard = ({ room, blockId, floorId }) => {
    return (
        <Card
            radius="sm"
            shadow="sm"
            className="border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200"
        >
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start w-full">
                    <h4 className="font-semibold text-gray-800">Room {room.room}</h4>
                    <StateChip state={room.state} issue={room.issue} />
                </div>
            </CardHeader>
            <CardBody className="pt-0">
                <CopySnippet
                    text={`client/${blockId}/${floorId}/${room.roomId}`}
                    className="bg-gray-50"
                />
            </CardBody>
        </Card>
    );
};

const FloorSection = ({ floor, blockId }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="mb-4">
            <Card
                radius="sm"
                shadow="sm"
                className="border-l-4 border-l-blue-500 border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200"
            >
                <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors py-3"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex justify-between items-center w-full">
                        <h3 className="font-semibold text-gray-800 text-lg">Floor {floor.floor}</h3>
                        <div className="flex items-center gap-3">
                            <Chip
                                variant="flat"
                                size="sm"
                                className="bg-blue-100 text-blue-800"
                            >
                                {floor.rooms.length} rooms
                            </Chip>
                            <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {isExpanded && (
                <div className="mt-3 ml-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {floor.rooms.map((room) => (
                        <RoomCard
                            key={room.roomId}
                            room={room}
                            blockId={blockId}
                            floorId={floor.floorId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const BlockSection = ({ block }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Calculate state counts
    const getStateCounts = () => {
        const counts = { active: 0, inactive: 0, maintenance: 0 };
        block.floors.forEach(floor => {
            floor.rooms.forEach(room => {
                counts[room.state] = (counts[room.state] || 0) + 1;
            });
        });
        return counts;
    };

    const stateCounts = getStateCounts();

    return (
        <div className="mb-6">
            <Card
                radius="sm"
                shadow="sm"
                className="border-l-4 border-l-blue-600 border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200"
            >
                <CardHeader
                    className="cursor-pointer hover:bg-gray-50 transition-colors py-4"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex justify-between items-center w-full">
                        <h2 className="font-bold text-gray-800 text-xl">Block {block.block}</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <Chip color="success" variant="flat" size="sm">
                                    Active: {stateCounts.active}
                                </Chip>
                                <Chip color="danger" variant="flat" size="sm">
                                    Inactive: {stateCounts.inactive}
                                </Chip>
                                <Chip color="warning" variant="flat" size="sm">
                                    Maintenance: {stateCounts.maintenance}
                                </Chip>
                            </div>
                            <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {isExpanded && (
                <div className="mt-4 ml-6">
                    {block.floors.map((floor) => (
                        <FloorSection
                            key={floor.floorId}
                            floor={floor}
                            blockId={block.blockId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export const DisplayBlockId = () => {
    const blocks = UseDashboardStore(e => e.blocks);
    const getBlocks = UseDashboardStore(e => e.getBlocks);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                // Simulate API call

                // In your actual implementation, replace this with:
                const response = await getBlocks();
                if (!response.state) {
                    toast('Some Error Occurred', response.message, 'danger');
                    return;
                }
                if (response.data?.length === 0) {
                    toast('No Data Found', 'No blocks available. Please refresh the page to try again.', 'warning');
                }

            } catch (error) {
                console.error('Error fetching blocks:', error);
                // toast('Error', 'Failed to fetch blocks', 'danger');
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <Skeleton className="h-8 w-80 rounded-lg mb-2" />
                        <Skeleton className="h-4 w-96 rounded-lg" />
                    </div>

                    <div className="space-y-8">
                        {/* Block skeleton */}
                        <div className="space-y-6">
                            <Card
                                radius="sm"
                                shadow="sm"
                                className="border-l-4 border-l-blue-600 border border-gray-200 bg-white"
                            >
                                <CardHeader className="space-y-3 py-4">
                                    <div className="flex justify-between items-center w-full">
                                        <Skeleton className="h-6 w-48 rounded-lg" />
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-2">
                                                <Skeleton className="h-6 w-20 rounded-full" />
                                                <Skeleton className="h-6 w-24 rounded-full" />
                                                <Skeleton className="h-6 w-28 rounded-full" />
                                            </div>
                                            <Skeleton className="h-5 w-5 rounded" />
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>

                            {/* Floor skeleton */}
                            <div className="ml-6 space-y-4">
                                <Card
                                    radius="sm"
                                    shadow="sm"
                                    className="border-l-4 border-l-blue-500 border border-gray-200 bg-white"
                                >
                                    <CardHeader className="py-3">
                                        <div className="flex justify-between items-center w-full">
                                            <Skeleton className="h-5 w-32 rounded-lg" />
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-5 w-16 rounded-full" />
                                                <Skeleton className="h-4 w-4 rounded" />
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>

                                {/* Room skeletons */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
                                    {[...Array(6)].map((_, index) => (
                                        <Card
                                            key={index}
                                            radius="sm"
                                            shadow="sm"
                                            className="border border-gray-200 bg-white"
                                        >
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start w-full">
                                                    <Skeleton className="h-5 w-16 rounded-lg" />
                                                    <div className="flex flex-col gap-1">
                                                        <Skeleton className="h-6 w-20 rounded-full" />
                                                        <Skeleton className="h-3 w-24 rounded" />
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardBody className="pt-0">
                                                <Skeleton className="h-10 w-full rounded-lg" />
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (blocks.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <Card className="max-w-md mx-auto bg-white border border-gray-200 shadow-md">
                    <CardBody className="p-6">
                        <div className="text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Data Found</h3>
                            <p className="text-gray-600">No blocks available. Please refresh the page to try again.</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Maintenance Dashboard</h1>
                    <p className="text-gray-600">Monitor and manage building blocks, floors, and rooms</p>
                </div>

                <div>
                    {blocks.map((block) => (
                        <BlockSection key={block.blockId} block={block} />
                    ))}
                </div>
            </div>
        </div>
    );
}