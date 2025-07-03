import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "../schema/clientSchema";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

export const ClientFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const isEditMode = !!defaultValues?.id;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });
  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {(onCloseInternal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {defaultValues ? "Edit Client" : "Add Client"}
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  {...register("name")}
                  label="Name"
                  // placeholder="Enter name"
                  variant="bordered"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Input
                  {...register("email")}
                  label="Email"
                  // placeholder="Enter email"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />

                <Input
                  {...register("phone")}
                  label="Phone"
                  // placeholder="Enter phone"
                  variant="bordered"
                  isInvalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />

                <div className="space-y-2">
                  {/* <label className="text-sm font-medium text-gray-700">
                    Tags
                  </label> */}
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <Input
                        {...register(`tags.${index}`)}
                        variant="bordered"
                        isInvalid={!!errors.tags?.[index]}
                        errorMessage={errors.tags?.[index]?.message}
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant="flat"
                    onPress={() => append("")}
                  >
                    + Add Tag
                  </Button>
                </div>

                {/* <Input
                  {...register("tags.0")}
                  label="Tag 1"
                  // placeholder="Enter first tag"
                  variant="bordered"
                />
                <Input
                  {...register("tags.1")}
                  label="Tag 2"
                  // placeholder="Enter second tag"
                  variant="bordered"
                /> */}

                <Input
                  {...register("address.city")}
                  label="City"
                  // placeholder="Enter city"
                  variant="bordered"
                />
                <Input
                  {...register("address.state")}
                  label="State"
                  // placeholder="Enter state"
                  variant="bordered"
                />
                <Input
                  {...register("address.zip")}
                  label="Zip Code"
                  // placeholder="Enter zip"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onCloseInternal}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  {isEditMode ? "Update" : "Add"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
