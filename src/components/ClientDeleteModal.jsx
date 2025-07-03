import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';

export const ClientDeleteModal = ({
  isOpen,
  onOpenChange,
  onDelete,
  selectedClient,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Client
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete{' '}
                <span className="font-semibold text-gray-900">
                  {selectedClient?.name}
                </span>
                ? This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onDelete();
                  onClose();
                }}
              >
                Delete Client
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
