import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import React from 'react'
import { InputComponent } from './input';
import { Form } from '@heroui/form';

export const AddFloor = ({
    edit,
    isOpen,
    onClose,
    floorName,
    handleFloor
}) => {

    function handleClose(e) {
        e.preventDefault();
        handleFloor(input);
        setInput('');
    }

    const [input, setInput] = React.useState(floorName);

    React.useEffect(() => {
        setInput(edit ? floorName : "");
    }, [floorName, isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            hideCloseButton
        >
            <ModalContent>
                <Form onSubmit={handleClose} className='w-full'>
                    <ModalHeader>
                        {edit ? "Edit" : "Add"} Floor
                    </ModalHeader>
                    <ModalBody className='w-full'>
                        <InputComponent
                            isRequired
                            autofocus
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
                            }}
                        >Cancel</Button>
                        <Button
                            color='primary'
                            type='submit'
                        >Save</Button>
                    </ModalFooter>
                </Form>
            </ModalContent>
        </Modal>
    )
}
