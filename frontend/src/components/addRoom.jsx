import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import React from 'react'
import { InputComponent } from './input'
import { SelectComponent } from './select'
import { Form } from "@heroui/form";
import { Delete, Edit } from '../assets'
import { cn } from '@heroui/theme'

export const AddRoomModal = (
    {
        isOpen,
        edit,
        onClose,
        roomName,
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
    const [room, setRoom] = React.useState(roomName);
    const [issue,setIssue] = React.useState(roomIssue);
    const [deleteRoom,setDeleteRoom] = React.useState(false);

    React.useEffect(() => {
        setRoom(edit ? roomName : "");
        setDeleteRoom(false);
        setIssue(roomIssue);
        setSelectedState(roomState);
    }, [roomName, isOpen, roomIssue]);

    function handleClose(e) {
        e.preventDefault();
        handleConfirm({
            room,
            state: selectedState,
            issue: issue,
            type: deleteRoom ? "delete" : "edit"
        });
        setRoom("");
        setSelectedState("inactive");
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
                <Form className='w-full' onSubmit={handleClose}>
                    <ModalHeader>
                        {deleteRoom ? <span className='flex items-center gap-2 mr-1'>
                            <Delete/>
                            Delete</span> : edit ? 
                            <span className='flex items-center gap-2 mr-1'>
                                <Edit/>
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
                                name={"room_name"}
                                isRequired
                                placeholder={"Eg: CB101"}
                                label={"Room Name"}
                                value={room ?? ""}
                                onchange={e => setRoom(e.target.value)}
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
                        <div className={cn('w-full flex',{
                            "justify-start" : edit,
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
                            type='submit'
                        >
                            {!deleteRoom ? "Save" : "Delete"}
                            </Button>

                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    )
}
