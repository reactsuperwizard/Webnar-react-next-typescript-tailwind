import { useState, useCallback } from "react";
import tw, { styled } from "twin.macro";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ArrowCircleRightIcon as OutlinedArrowCircleRightIcon } from "@heroicons/react/outline";

import { CustomInput, Checkbox, RadioButton } from "../../components";
import { CardNumberInput } from "../../components/cardnumber-input";
import { SecurityCodeInput } from "../../components/security-code-input";
import { CardType } from "../../types";
import { CARD_MAP } from "../../utils/constants";

const schema = yup
  .object({
    cardNumber: yup.string().required("Card Number is required"),
    expiry: yup.string().required("Expiry Date is required"),
    cvc: yup.string().required("CVC is required"),
  })
  .required();

type PaymentFormProps = {
  onSave?: (data: any) => void;
};

export const PaymentForm = ({ onSave }: PaymentFormProps) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const processOrder = () => {};
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
      <div tw="border border-brand  rounded-lg p-2 flex items-center justify-between mt-4">
        <div tw="flex items-center">
          <RadioButton tw="px-0 ml-2" checked={!!selectedCard} />
          <span tw="text-black text-base ml-2.5">Credit Card</span>
        </div>
        <div tw="flex items-center">
          {Object.keys(CARD_MAP).map((key) => (
            <button
              key={key}
              tw="ml-2"
              onClick={() => setSelectedCard(key as CardType)}
            >
              {CARD_MAP[key]}
            </button>
          ))}
        </div>
      </div>
      <div tw="mt-8 relative">
        <CardNumberInput
          placeholder="Enter Credit Card Number"
          card={selectedCard}
        />
      </div>
      <div tw="flex gap-x-2 mt-4">
        <CustomInput
          label="Expiration Date"
          placeholder="Expiration Date (MM/YY)"
          tw="flex-grow"
          state={
            errors.expiry?.message
              ? "danger"
              : !!watch("expiry")
              ? "success"
              : "normal"
          }
          {...register("expiry")}
          error={errors.expiry?.message}
        />
        <SecurityCodeInput tw="flex-grow" />
      </div>
      <div tw="mt-6">
        <Checkbox
          label="Save my payment method"
          variant="squared"
          name="save_payment"
        />
      </div>
      <div tw="pt-7 text-xs leading-[150%] text-csp_neutral-DarkBG">
        By clicking the “Yes! Process My Order” button below, you agree to our{" "}
        <span tw="text-brand">Terms of Use, Privacy Statement,</span> that you
        are over 18, and that your membership{" "}
        <strong>
          will automatically continue at the same monthly membership fee charged
          to your payment method until you cancel. You may cancel at any time to
          avoid future charges
        </strong>
        . To cancel, go to your Account and click “Cancel Membership.”
      </div>

      <div tw="flex justify-center mt-8">
        <StyledOrderButton onClick={processOrder}>
          <span tw="font-bold">YES!</span> &nbsp; Process My Order{" "}
          <span>
            <OutlinedArrowCircleRightIcon tw="w-5 h-5" />
          </span>
        </StyledOrderButton>
      </div>
    </form>
  );
};

const StyledOrderButton = styled.button`
  ${tw`flex items-center text-white rounded-lg py-[14px] px-6 bg-brand-600 hover:bg-brand-800 focus:bg-brand-600 focus:outline-brand`}
`;
