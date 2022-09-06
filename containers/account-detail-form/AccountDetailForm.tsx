import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { CustomInput, Button } from "../../components";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phone: yup.string().required("Phone Number is required"),
  })
  .required();

export const AccountDetailForm = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((data) => {
    onSave?.(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div tw="flex flex-col">
        <div tw="flex flex-col gap-y-2 md:flex-row md:gap-x-4">
          <CustomInput
            tw="flex-grow"
            label="First Name"
            state={
              errors.firstName?.message
                ? "danger"
                : !!watch("firstName")
                ? "success"
                : "normal"
            }
            {...register("firstName")}
            placeholder="Jhone"
            error={errors.firstName?.message}
          />
          <CustomInput
            tw="flex-grow"
            label="Last Name"
            state={
              errors.lastName?.message
                ? "danger"
                : !!watch("lastName")
                ? "success"
                : "normal"
            }
            {...register("lastName")}
            placeholder="Doe"
            error={errors.lastName?.message}
          />
        </div>
        <div tw="mt-2">
          <CustomInput
            label="Phone number"
            state={
              errors.phone?.message
                ? "danger"
                : !!watch("phone")
                ? "success"
                : "normal"
            }
            {...register("phone")}
            placeholder="(352) 343 5222"
            error={errors.phone?.message}
          />
        </div>
        <div tw="flex justify-between items-center mt-4">
          <button
            type="button"
            tw="text-csp-brand text-sm font-medium leading-[150%]"
          >
            Back to account
          </button>
          <Button
            type="submit"
            color="brand"
            title="Save &amp; Continue"
            icon={<ArrowCircleRightIcon tw="w-5 h-5" />}
            variant="primary"
          />
        </div>
      </div>
    </form>
  );
};
