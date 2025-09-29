import React from 'react';
import { Form } from '@heroui/form';
import { Button } from '@heroui/button';
import { InputComponent } from './input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';


export const AddFloor = ({
    edit,
    block,
    isOpen,
    onClose,
    floor_Id,
    floorName,
    handleFloor
}) => {
    const [input, setInput] = React.useState(floorName);
    const [floorId, setFloorId] = React.useState(floor_Id);
    const [err, setErr] = React.useState({
        floorId: "",
        floorName:""
    });

    function handleSubmit() {
        if (!floorId || !floorId.trim()) { 
            setErr(p => ({ ...p, floorId: "Please fill out this field" }));
            return;
        }
        if (!input || !input.trim()) {
            setErr(p => ({ ...p, floorName: "Please fill out this field" }));
            return;
        }
        handleClose();
    }

    React.useEffect(() => {
        setInput(edit ? floorName : "");
        setFloorId(edit ? floor_Id : "");
        setErr("");

    }, [floorName, floor_Id, isOpen]);

    function handleClose() {
        if (err.floorId || err.floorName) {
            return;
        }
        console.log(err);
        handleFloor({ floor_Id:floorId, floorName: input });
        setInput('');
        setFloorId('');
        setErr("");
    }

    function handleFloorId(e) {
        setFloorId(e.target.value);
        const exists = block.floors?.some(
            (floor) => floor.floorId.toLowerCase() === e.target.value.toLowerCase()
        );
        const hasSlash = /\//.test(e.target.value);
    
        if (exists) {
            setErr(p => ({ ...p, floorId: "FloorId already exists" }));
        }
        else if (hasSlash) {
            setErr(p => ({ ...p, floorId: "ID cannot have slashes" }));
        }
        else {
            setErr(p => ({...p,floorId:""}));
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} hideCloseButton>
            <ModalContent>
                <Form onSubmit={handleClose} className='w-full'>
                    <ModalHeader>
                        {edit ? "Edit" : "Add"} Floor
                    </ModalHeader>
                    <ModalBody className='w-full'>
                        <InputComponent
                            isRequired
                            autofocus
                            label={"Floor ID"}
                            isInvalid={!!err.floorId}
                            errorMessage={err.floorId}
                            labelPlacement={"outside-top"}
                            placeholder={"Enter Floor ID"}
                            value={floorId}
                            onchange={handleFloorId}
                        />
                        <InputComponent
                            isRequired
                            label={"Floor Name"}
                            labelPlacement={"outside-top"}
                            placeholder={"Enter Floor Name"}
                            isInvalid={!!err.floorName}
                            errorMessage={err.floorName}
                            value={input}
                            onchange={e => {
                                setInput(e.target.value);
                                if (e.target.value.trim()) {
                                    setErr(p => ({ ...p, floorName: "" }));
                                }
                             }}
                        />
                    </ModalBody>
                    <ModalFooter className='w-full'>
                        <Button
                            variant='bordered'
                            onPress={() => {
                                onClose("cancel");
                                setInput('');
                                setFloorId('');
                            }}
                        >
                            Cancel
                        </Button>
                        <Button color='primary' onPress={handleSubmit}>
                            Save
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    )
}
