import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import React from 'react'
import { InputComponent } from './input';

export const AddFloor = ({
    isOpen,
    onClose,
    handleFloor
}) => {

    function handleClose() {
        handleFloor(input);
        setInput('');
    }

  const [input, setInput] = React.useState('');

  return (
      <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          hideCloseButton
      >
          <ModalContent>
              <ModalHeader>
                  Add Floor
              </ModalHeader>
              <ModalBody>
                  <InputComponent
                      label={"Floor Name"}
                      labelPlacement={"outside-top"}
                      placeholder={"Enter Floor Name"}
                      value={input}
                      onchange={e => setInput(e.target.value)}
                  />
              </ModalBody>
              <ModalFooter>
                  <Button
                      variant='bordered'
                      onPress={() => {
                          onClose("cancel");
                          setInput('');
                       }}
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
