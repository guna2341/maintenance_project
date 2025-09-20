import React from 'react';
import { Form } from '@heroui/form';
import { Button } from '@heroui/button';
import { InputComponent } from './input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';

export const AddFloor = ({
    edit,
    isOpen,
    onClose,
    floor_Id,
    floorName,
    handleFloor
}) => {
    const [input, setInput] = React.useState(floorName);
    const [floorId, setFloorId] = React.useState(floor_Id);
    const [err, setErr] = React.useState("");

    React.useEffect(() => {
        setInput(edit ? floorName : "");
        setFloorId(edit ? floor_Id : "");
    }, [floorName, floor_Id, isOpen]);

    function handleClose(e) {
        e.preventDefault();
        handleFloor({ floor_Id:floorId, floorName: input });
        setInput('');
        setFloorId('');
    }

    function handleFloorId(e) {
        const hasHyphen = /-/.test(e.target.value);
        setFloorId(e.target.value);
        if (hasHyphen) {
            setErr("Id cannot have hyphens");
        }
        else {
            setErr("");
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
                            isInvalid={!!err}
                            errorMessage={err}
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
                            value={input}
                            onchange={e => setInput(e.target.value)}
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
                        <Button color='primary' type='submit'>
                            Save
                        </Button>
                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    )
}
