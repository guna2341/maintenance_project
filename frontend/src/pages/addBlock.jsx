import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Chip } from '@heroui/chip';

const AddBlockPage = () => {
  const [blockData, setBlockData] = useState({
    block: '',
    floors: [
      {
        id: '1',
        block: '',
        rooms: [
          {
            id: '1',
            room: '',
            state: 'active',
            issue: ''
          }
        ]
      }
    ]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const stateOptions = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
    { key: 'maintenance', label: 'Maintenance' }
  ];

  // Add new floor
  const addFloor = () => {
    const newFloor = {
      id: Date.now().toString(),
      block: '',
      rooms: [
        {
          id: Date.now().toString() + '_room',
          room: '',
          state: 'active',
          issue: ''
        }
      ]
    };
    setBlockData(prev => ({
      ...prev,
      floors: [...prev.floors, newFloor]
    }));
  };

  // Remove floor
  const removeFloor = (floorIndex) => {
    if (blockData.floors.length > 1) {
      setBlockData(prev => ({
        ...prev,
        floors: prev.floors.filter((_, index) => index !== floorIndex)
      }));
    }
  };

  // Update floor name
  const updateFloorName = (floorIndex, name) => {
    setBlockData(prev => ({
      ...prev,
      floors: prev.floors.map((floor, index) =>
        index === floorIndex ? { ...floor, block: name } : floor
      )
    }));
  };

  // Add room to floor
  const addRoom = (floorIndex) => {
    const newRoom = {
      id: Date.now().toString(),
      room: '',
      state: 'active',
      issue: ''
    };
    setBlockData(prev => ({
      ...prev,
      floors: prev.floors.map((floor, index) =>
        index === floorIndex
          ? { ...floor, rooms: [...floor.rooms, newRoom] }
          : floor
      )
    }));
  };

  // Remove room
  const removeRoom = (floorIndex, roomIndex) => {
    setBlockData(prev => ({
      ...prev,
      floors: prev.floors.map((floor, index) =>
        index === floorIndex
          ? { ...floor, rooms: floor.rooms.filter((_, rIndex) => rIndex !== roomIndex) }
          : floor
      )
    }));
  };

  // Update room
  const updateRoom = (floorIndex, roomIndex, field, value) => {
    setBlockData(prev => ({
      ...prev,
      floors: prev.floors.map((floor, fIndex) =>
        fIndex === floorIndex
          ? {
            ...floor,
            rooms: floor.rooms.map((room, rIndex) =>
              rIndex === roomIndex ? { ...room, [field]: value } : room
            )
          }
          : floor
      )
    }));
  };

  // Calculate states summary
  const calculateStates = () => {
    let active = 0, inactive = 0, maintenance = 0;

    blockData.floors.forEach(floor => {
      floor.rooms.forEach(room => {
        switch (room.state) {
          case 'active': active++; break;
          case 'inactive': inactive++; break;
          case 'maintenance': maintenance++; break;
        }
      });
    });

    return { active, inactive, maintenance };
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!blockData.block.trim()) {
      newErrors.block = 'Block name is required';
    }

    blockData.floors.forEach((floor, fIndex) => {
      if (!floor.block.trim()) {
        newErrors[`floor_${fIndex}`] = 'Floor name is required';
      }

      floor.rooms.forEach((room, rIndex) => {
        if (!room.room.trim()) {
          newErrors[`room_${fIndex}_${rIndex}`] = 'Room name is required';
        }
        if (room.state === 'inactive' || room.state === 'maintenance') {
          if (!room.issue.trim()) {
            newErrors[`issue_${fIndex}_${rIndex}`] = 'Issue description is required';
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      const states = calculateStates();
      const finalBlockData = {
        id: Date.now().toString(),
        ...blockData,
        states
      };

      console.log('Block data to save:', finalBlockData);
      alert('Block created successfully!');

      // Reset form
      setBlockData({
        block: '',
        floors: [{
          id: '1',
          block: '',
          rooms: [{
            id: '1',
            room: '',
            state: 'active',
            issue: ''
          }]
        }]
      });
      setCurrentStep(1);
      setErrors({});
    }
  };

  const states = calculateStates();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Button
              isIconOnly
              variant="light"
              onClick={() => console.log('Go back')}
              className="min-w-10 w-10 h-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Add New Block</h1>
              <p className="text-gray-600">Create a new building block with floors and rooms</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep >= 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-medium">Block Details</span>
            </div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep >= 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v-4m4 4v-4m4 4v-4" />
              </svg>
              <span className="font-medium">Floors & Rooms</span>
            </div>
            <div className="w-8 h-1 bg-gray-300 rounded"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep >= 3 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span className="font-medium">Review & Save</span>
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <h2 className="text-xl font-semibold">Block Information</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <Input
                label="Block Name"
                placeholder="e.g., Computer Science Block"
                value={blockData.block}
                onChange={(e) => setBlockData(prev => ({ ...prev, block: e.target.value }))}
                isInvalid={!!errors.block}
                errorMessage={errors.block}
                variant="bordered"
              />

              <div className="flex justify-end">
                <Button
                  color="primary"
                  onClick={() => setCurrentStep(2)}
                  disabled={!blockData.block.trim()}
                >
                  Next: Add Floors
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Floors & Rooms Configuration</h2>
              <Button
                color="primary"
                variant="flat"
                onClick={addFloor}
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Add Floor
              </Button>
            </div>

            {blockData.floors.map((floor, floorIndex) => (
              <Card key={floor.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v-4m4 4v-4m4 4v-4" />
                    </svg>
                    <Input
                      placeholder="Floor name (e.g., Ground Floor, First Floor)"
                      value={floor.block}
                      onChange={(e) => updateFloorName(floorIndex, e.target.value)}
                      isInvalid={!!errors[`floor_${floorIndex}`]}
                      errorMessage={errors[`floor_${floorIndex}`]}
                      variant="underlined"
                      className="max-w-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      onClick={() => addRoom(floorIndex)}
                      startContent={
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      }
                    >
                      Add Room
                    </Button>
                    {blockData.floors.length > 1 && (
                      <Button
                        size="sm"
                        color="danger"
                        variant="light"
                        onClick={() => removeFloor(floorIndex)}
                        isIconOnly
                        className="min-w-8 w-8 h-8"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {floor.rooms.map((room, roomIndex) => (
                      <Card key={room.id} className="bg-gray-50">
                        <CardBody className="space-y-3">
                          <div className="flex justify-between items-start">
                            <Input
                              label="Room Name"
                              placeholder="e.g., CB101"
                              value={room.room}
                              onChange={(e) => updateRoom(floorIndex, roomIndex, 'room', e.target.value)}
                              isInvalid={!!errors[`room_${floorIndex}_${roomIndex}`]}
                              errorMessage={errors[`room_${floorIndex}_${roomIndex}`]}
                              size="sm"
                              variant="bordered"
                              className="flex-1"
                            />
                            <Button
                              size="sm"
                              color="danger"
                              variant="light"
                              onClick={() => removeRoom(floorIndex, roomIndex)}
                              isIconOnly
                              className="ml-2 min-w-8 w-8 h-8"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </Button>
                          </div>

                          <Select
                            label="Room State"
                            selectedKeys={[room.state]}
                            onChange={(e) => updateRoom(floorIndex, roomIndex, 'state', e.target.value)}
                            size="sm"
                            variant="bordered"
                          >
                            {stateOptions.map(option => (
                              <SelectItem key={option.key} value={option.key}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </Select>

                          {(room.state === 'inactive' || room.state === 'maintenance') && (
                            <Input
                              label="Issue Description"
                              placeholder="Describe the issue..."
                              value={room.issue}
                              onChange={(e) => updateRoom(floorIndex, roomIndex, 'issue', e.target.value)}
                              isInvalid={!!errors[`issue_${floorIndex}_${roomIndex}`]}
                              errorMessage={errors[`issue_${floorIndex}_${roomIndex}`]}
                              size="sm"
                              variant="bordered"
                            />
                          )}

                          <div className="flex justify-center">
                            <Chip
                              color={
                                room.state === 'active' ? 'success' :
                                  room.state === 'inactive' ? 'danger' : 'warning'
                              }
                              variant="flat"
                              size="sm"
                            >
                              {room.state.charAt(0).toUpperCase() + room.state.slice(1)}
                            </Chip>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </CardBody>
              </Card>
            ))}

            <div className="flex justify-between">
              <Button
                variant="light"
                onClick={() => setCurrentStep(1)}
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Back
              </Button>
              <Button
                color="primary"
                onClick={() => setCurrentStep(3)}
              >
                Review & Save
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review Block Configuration</h2>

            {/* Block Summary */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <h3 className="text-lg font-semibold">{blockData.block}</h3>
                      <p className="text-gray-600">{blockData.floors.length} floors configured</p>
                    </div>
                  </div>

                  {/* Stats Summary */}
                  <div className="flex gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{states.active}</div>
                      <div className="text-xs text-gray-500">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{states.inactive}</div>
                      <div className="text-xs text-gray-500">Inactive</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{states.maintenance}</div>
                      <div className="text-xs text-gray-500">Maintenance</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Floors Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {blockData.floors.map((floor, floorIndex) => (
                <Card key={floor.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15v-4m4 4v-4m4 4v-4" />
                      </svg>
                      <div>
                        <h4 className="font-semibold">{floor.block}</h4>
                        <p className="text-sm text-gray-600">{floor.rooms.length} rooms</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-2">
                      {floor.rooms.map((room, roomIndex) => (
                        <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium">{room.room}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Chip
                              color={
                                room.state === 'active' ? 'success' :
                                  room.state === 'inactive' ? 'danger' : 'warning'
                              }
                              variant="flat"
                              size="sm"
                            >
                              {room.state.charAt(0).toUpperCase() + room.state.slice(1)}
                            </Chip>
                            {room.issue && (
                              <span className="text-xs text-gray-500 max-w-32 truncate">
                                {room.issue}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button
                variant="light"
                onClick={() => setCurrentStep(2)}
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Back to Edit
              </Button>
              <Button
                color="success"
                onClick={handleSubmit}
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                }
              >
                Create Block
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlockPage;