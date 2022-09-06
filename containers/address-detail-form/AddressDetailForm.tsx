import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  ArrowCircleRightIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";

import { CustomInput, Button } from "../../components";

const schema = yup
  .object({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipCode: yup.string().required("Zip Code is require"),
    address2: yup.string(),
  })
  .required();

type AddressDetailFormProps = {
  onSave?: (data: any) => void;
};

export const AddressDetailForm = ({ onSave }: AddressDetailFormProps) => {
  const [showAddressLine2, setShowAddressLine2] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    (data) => {
      onSave?.(data);
    },
    [onSave]
  );

  return (
    <form tw="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div tw="flex mt-4 flex-col">
        <CustomInput
          tw="flex-grow"
          label="Address"
          placeholder="123 Finance Street"
          state={
            errors.address?.message
              ? "danger"
              : !!watch("address")
              ? "success"
              : "normal"
          }
          {...register("address")}
          error={errors.address?.message}
        />
        {showAddressLine2 && (
          <CustomInput
            tw="mt-2"
            label="Address 2"
            placeholder="suite 3553"
            state={
              errors.address2?.message
                ? "danger"
                : !!watch("address2")
                ? "success"
                : "normal"
            }
            {...register("address2")}
            error={errors.address2?.message}
          />
        )}
        <button
          type="button"
          tw="text-xs leading-[150%] font-semibold text-csp-brand flex items-center"
        >
          {!showAddressLine2 ? (
            <PlusCircleIcon tw="w-5 h-5" />
          ) : (
            <MinusCircleIcon tw="w-5 h-5" />
          )}
          <span tw="p-2" onClick={() => setShowAddressLine2(!showAddressLine2)}>
            {showAddressLine2
              ? "Remove Address Line 2"
              : "Add Address Line 2 (Optional)"}
          </span>
        </button>
      </div>
      <div tw="mt-4">
        <CustomInput
          label="City"
          placeholder="San Francisco"
          state={
            errors.city?.message
              ? "danger"
              : !!watch("city")
              ? "success"
              : "normal"
          }
          {...register("city")}
          error={errors.city?.message}
        />
      </div>
      <div tw="flex flex-col gap-y-2 md:flex-row md:gap-x-4 mt-4">
        <CustomInput
          tw="flex-grow"
          label="State"
          state={
            errors.state?.message
              ? "danger"
              : !!watch("state")
              ? "success"
              : "normal"
          }
          {...register("state")}
          error={errors.state?.message}
          placeholder="Califonia"
        />
        <CustomInput
          tw="flex-grow"
          label="Zip Code"
          state={
            errors.zipCode?.message
              ? "danger"
              : !!watch("zipCode")
              ? "success"
              : "normal"
          }
          {...register("zipCode")}
          error={errors.zipCode?.message}
          placeholder="52341"
        />
      </div>
      <div tw="flex justify-between items-center mt-8">
        <button
          type="button"
          tw="text-csp-brand text-sm font-medium leading-[150%]"
        >
          Back to address
        </button>
        <Button
          type="submit"
          color="brand"
          title="Save &amp; Continue"
          icon={<ArrowCircleRightIcon tw="w-5 h-5" />}
          variant="primary"
        />
      </div>
    </form>
  );
};
