import { Button } from '@heroui/button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";

export const BlockDeleteModal = ({ isOpen, onCancel, onConfirm, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ModalContent>
        <ModalHeader className="text-xl font-semibold">
          Delete Block
        </ModalHeader>

        <ModalBody>
          <p className="text-gray-600 dark:text-gray-300">
            Are you sure you want to delete this block? This action cannot be undone.
          </p>
        </ModalBody>

        <ModalFooter>
          <Button variant="bordered" className="hover:" onPress={onCancel} isDisabled={loading}>
            Cancel
          </Button>
          <Button color="danger" onPress={onConfirm} isLoading={loading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
