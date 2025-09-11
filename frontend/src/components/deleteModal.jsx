import { Button } from '@heroui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import React from 'react'

export const DeleteModal = (
    {
        type,
        isOpen,
        onClose,
        onFloorDelete,
        onRoomDelete
    }
) => {

    function handleDelete() {
        if (type == "floor") {
            onFloorDelete();
        }
        else {
            onRoomDelete();
        }
    }

  return (
    <Modal isOpen={isOpen} hideCloseButton>
        <ModalContent>
            <ModalHeader>
               Delete 
            </ModalHeader>
            <ModalBody>
                <p>Are you sure you want to delete this {type}?</p>
            </ModalBody>
            <ModalFooter>
                  <Button
                      variant='bordered'
                      onPress={onClose}
                  >Cancel</Button>
                  <Button
                      color='danger'
                      onPress={handleDelete}
                  >Delete</Button>

            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}
