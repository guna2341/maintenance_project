import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import React from 'react'
import { InputComponent } from './input'
import { SelectComponent } from './select'

export const AddRoomModal = (
    {
        isOpen,
        onClose,
        roomData
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
    const [selectedState, setSelectedState] = React.useState("");
    const [room, setRoom] = React.useState("");

    function handleClose() {
        roomData({
            room,
            state: selectedState
        });
     }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            hideCloseButton
        >
            <ModalContent>
                <ModalHeader>
                    Add Room
                </ModalHeader>
                <ModalBody>
                    <div className='flex flex-col gap-4'>
                        <InputComponent
                            placeholder={"Eg: CB101"}
                            label={"Room Name"}
                            value={room}
                            onchange={setRoom}
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
                <ModalFooter>
                    <Button
                        variant='bordered'
                        onPress={() => onClose("cancel")}
                    >Cancel</Button>
                    <Button
                        color='primary'
                        onPress={() => handleClose()}
                    >Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
