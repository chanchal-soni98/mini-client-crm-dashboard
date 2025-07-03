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

  useEffect(() => {
  if (isOpen) {
    reset({
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      tags: defaultValues?.tags?.length ? defaultValues.tags : [""],
      address: {
        city: defaultValues?.address?.city || "",
        state: defaultValues?.address?.state || "",
        zip: defaultValues?.address?.zip || "",
      },
    });
  }
}, [isOpen, defaultValues, reset]);



  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        {(onCloseInternal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {defaultValues ? "Edit Client" : "Add Client"}
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody
                className="max-h-[65vh] overflow-y-auto space-y-4 hide-scrollbar"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <Input
                  {...register("name")}
                  label="Name"
                  variant="bordered"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Input
                  {...register("email")}
                  label="Email"
                  variant="bordered"
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />

                <Input
                  {...register("phone")}
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
                    onPress={() => append("")}
                  >
                    + Add Tag
                  </Button>
                </div>

                <Input
                  {...register("address.city")}
                  label="City"
                  variant="bordered"
                />
                <Input
                  {...register("address.state")}
                  label="State"
                  variant="bordered"
                />
                <Input
                  {...register("address.zip")}
                  label="Zip Code"
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
