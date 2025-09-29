import React from 'react';
import { cn } from '@heroui/theme';
import { Form } from "@heroui/form";
import { Button } from '@heroui/button';
import { Delete, Edit } from '../assets';
import { InputComponent, SelectComponent } from './index';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';

export const AddRoomModal = (
    {
        isOpen,
        edit,
        block,
        floorId,
        onClose,
        roomName,
        room_Id,
        roomIssue,
        roomState,
        handleConfirm
    }
) => {
    const states = [
        {
            key: "active",
            label: "Active"
        },
        {
            key: "inactive",
            label: "InActive"
        },
        {
            key: "maintenance",
            label: "Maintenance"
        }
    ];
    const [selectedState, setSelectedState] = React.useState("inactive");
    const [err, setErr] = React.useState({
        roomId: "",
        roomName:""
    });
    const [room, setRoom] = React.useState(roomName);
    const [issue, setIssue] = React.useState(roomIssue);
    const [roomId, setRoomId] = React.useState(room_Id);
    const [deleteRoom, setDeleteRoom] = React.useState(false);

    React.useEffect(() => {
        setRoom(edit ? roomName : "");
        setDeleteRoom(false);
        setIssue(roomIssue);
        setRoomId(room_Id);
        setErr("");
        setSelectedState(roomState ?? "inactive");
    }, [roomName, isOpen, roomIssue]);

    function handleSubmit() {
        if (!roomId) {
            setErr(p => ({ ...p, roomId: "Please fill out this field" }));
            return;
        }
        if (!room) {
            setErr(p => ({ ...p, room: "Please fill out this field" }));
            return;
        }
        handleClose();
    }

    function handleClose() {
 
        if (err.room || err.roomId) {
            return;
        }
        handleConfirm({
            room,
            state: selectedState,
            issue: issue,
            room_Id: roomId,
            type: deleteRoom ? "delete" : "edit"
        });
        setRoom("");
        setRoomId("");
        setSelectedState("inactive");
    }

    function handleRoomId(e) {
        const floor = block?.floors?.find((_, index) => index == floorId);
        const exists = floor?.rooms?.some(item => item.roomId.toLowerCase() == e.target.value.toLowerCase());
        const hasSlash = /\//.test(e.target.value);
        setRoomId(e.target.value);
        if (exists) {
            setErr(p => ({ ...p, roomId: "Room ID already exists" }));
        }
        else if (hasSlash) {
            setErr(p => ({ ...p, roomId: "Id cannot have hyphens" }));
        }
        else {
            setErr(p => ({ ...p, roomId: ""}));
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={() => {
                setDeleteRoom(false);
                onClose();
            }}
        >
            <ModalContent className='font-poppins'>
                <Form className='w-full' onSubmit={handleSubmit}>
                    <ModalHeader>
                        {deleteRoom ? <span className='flex items-center gap-2 mr-1'>
                            <Delete />
                            Delete</span> : edit ?
                            <span className='flex items-center gap-2 mr-1'>
                                <Edit />
                                Edit
                            </span>
                            : "Add"}Room
                    </ModalHeader>
                    {deleteRoom ?
                        <ModalBody className='w-full'>
                            Are you sure you want to delete this room?
                        </ModalBody>
                        :
                        <ModalBody className='w-full'>
                            <div className='flex flex-col gap-4'>
                                <InputComponent
                                    autofocus
                                    name={"room_Id"}
                                    isRequired
                                    isInvalid={!!err.roomId}
                                    errorMessage={err.roomId}
                                    placeholder={"Eg: CB101"}
                                    label={"Room ID"}
                                    value={roomId ?? ""}
                                    onchange={handleRoomId}
                                    labelPlacement={"outside-top"}
                                />
                                <InputComponent
                                    name={"room_name"}
                                    isRequired
                                    isInvalid={!!err.room}
                                    errorMessage={err.room}
                                    placeholder={"Eg: CB101"}
                                    label={"Room Name"}
                                    value={room ?? ""}
                                    onchange={e => {
                                        setRoom(e.target.value); 
                                        if (e.target.value || e.target.value.trim()) {
                                            setErr(p => ({ ...p, room: "" }));
                                        }
                                    }}
                                    labelPlacement={"outside-top"}
                                />
                                <InputComponent
                                    name={"issue"}
                                    placeholder={"Enter issue if any"}
                                    label={"Issue"}
                                    value={issue ?? ""}
                                    onchange={e => setIssue(e.target.value)}
                                    labelPlacement={"outside-top"}
                                />
                                <SelectComponent
                                    selectedKeys={selectedState}
                                    onChange={setSelectedState}
                                    radius={"sm"}
                                    placeholder={"Select State"}
                                    label={"Select Room State"}
                                    labelPlacement={"outside"}
                                    className={"md:max-w-full"}
                                    classNames={{
                                        trigger: "bg-white border border-black/15"
                                    }}
                                    items={states}
                                />
                            </div>
                        </ModalBody>
                    }

                    <ModalFooter className='w-full'>
                        {!deleteRoom &&
                            <div className={cn('w-full flex', {
                                "justify-start": edit,
                                "justify-end": !edit
                            })}>
                                <Button

                                    variant='bordered'
                                    onPress={() => {
                                        setDeleteRoom(false);
                                        onClose();
                                    }}
                                >Cancel</Button>
                            </div>
                        }
                        {edit &&
                            <Button
                                color={deleteRoom ? "default" : 'danger'}
                                variant="bordered"
                                onPress={() => setDeleteRoom(p => (!p))}
                            >{deleteRoom ? "Cancel" : "Delete"}
                            </Button>
                        }
                        <Button
                            color={!deleteRoom ? "primary" : "danger"}
                            onPress={handleSubmit}
                        >
                            {!deleteRoom ? "Save" : "Delete"}
                        </Button>

                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    )
}
