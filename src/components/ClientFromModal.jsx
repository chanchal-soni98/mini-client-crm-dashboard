import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema } from '../schema/clientSchema';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@heroui/react';

const ClientForm = ({ selectedClient, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: selectedClient,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
    rules: { minLength: 1 },
  });

  const isEditMode = !!selectedClient?.id;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {isEditMode ? 'Edit Client' : 'Add Client'}
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody
          className="max-h-[65vh] overflow-y-auto space-y-2 hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Input
            {...register('name')}
            label="Name"
            variant="bordered"
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />

          <Input
            {...register('email')}
            label="Email"
            variant="bordered"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Input
            {...register('phone')}
            label="Phone"
            variant="bordered"
            isInvalid={!!errors.phone}
            errorMessage={errors.phone?.message}
          />

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  {...register(`tags.${index}`)}
                  variant="bordered"
                  isInvalid={!!errors.tags?.[index]}
                  errorMessage={errors.tags?.[index]?.message}
                />
                <Button
                  type="button"
                  onPress={() => remove(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              variant="flat"
              onPress={() => append('')}
            >
              + Add Tag
            </Button>
          </div>

          {errors.tags && (
            <p className="text-red-500 text-sm">
              {errors.tags.message || 'At least one tag is required.'}
            </p>
          )}

          <Input
            {...register('address.city')}
            label="City"
            variant="bordered"
            isInvalid={!!errors.address?.city}
            errorMessage={errors.address?.city?.message}
          />
          <Input
            {...register('address.state')}
            label="State"
            variant="bordered"
            isInvalid={!!errors.address?.state}
            errorMessage={errors.address?.state?.message}
          />
          <Input
            {...register('address.zip')}
            label="Zip Code"
            variant="bordered"
            isInvalid={!!errors.address?.zip}
            errorMessage={errors.address?.zip?.message}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};

export const ClientFormModal = ({
  isOpen,
  onOpenChange,
  onSubmit,
  selectedClient,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ClientForm
              selectedClient={selectedClient}
              onSubmit={(data) => {
                onSubmit(data);
                onClose();
              }}
              onClose={onClose}
            />
          </>
        )}
      </ModalContent>
    </Modal>
  );
};