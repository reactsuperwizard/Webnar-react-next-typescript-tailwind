import tw from "twin.macro";
import React, { HTMLProps, useState } from "react";

type TextFieldProps = HTMLProps<HTMLInputElement> & {
  variant?: "primary" | "secondary";
  rounded?: boolean;
  label?: string;
  error?: string;
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant,
      rounded,
      label,
      id,
      placeholder,
      type,
      name,
      required,
      error,
      ...rest
    }: TextFieldProps,
    ref
  ) => {
    const [invalid, setInvalid] = useState(false);
    const [dirty, setDirty] = useState(false);

    const onBlurHandler = () => {
      setDirty(true);
    };

    return (
      <div tw="w-full">
        {label && (
          <label
            htmlFor={id}
            tw="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          css={[
            rounded && tw`rounded-lg`,
            tw`bg-gray-50 border border-gray-300 text-gray-900 text-sm ring-transparent block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light`,
            // variant === "primary" &&
          ]}
          tw="shadow-sm w-full"
          placeholder={placeholder}
          required={required}
          onBlur={onBlurHandler}
          {...rest}
        />
        {error && invalid && dirty && (
          <p tw="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
