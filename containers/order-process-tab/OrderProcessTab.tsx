import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  CreditCardIcon,
  IdentificationIcon,
  LocationMarkerIcon,
  UserIcon,
} from "@heroicons/react/solid";

import tw, { styled } from "twin.macro";

type OrderProcess = {
  step: number;
  name: string;
  icon: React.ReactNode;
};

type OrderProcessTabProps = {
  onChangeStep?: (step: number) => void;
  info?: Array<{
    step: number;
    name: string;
    detail: string;
  }>;
  currentStep: number;
};

export const OrderProcessTab = ({
  onChangeStep,
  info,
  currentStep,
}: OrderProcessTabProps) => {
  const processes = useMemo<OrderProcess[]>(
    () => [
      {
        step: 1,
        name: "Your Account",
        icon: <UserIcon tw="w-6 h-6" />,
      },
      {
        step: 2,
        name: "Account Details",
        icon: <IdentificationIcon tw="w-6 h-6" />,
      },
      {
        step: 3,
        name: "Address Details",
        icon: <LocationMarkerIcon tw="w-6 h-6" />,
      },
      {
        step: 4,
        name: "Payment Details",
        icon: <CreditCardIcon tw="w-6 h-6" />,
      },
    ],
    []
  );

  return (
    <TabWrapper>
      <div tw="flex items-center w-full">
        {processes.map((_process) => (
          <ProcessTabItem
            step={`${_process.step}/${processes.length}`}
            name={_process.name}
            icon={_process.icon}
            status={
              currentStep === _process.step
                ? "active"
                : _process.step < currentStep
                ? "done"
                : "ready"
            }
            onClick={() => onChangeStep?.(_process.step)}
          />
        ))}
      </div>

      <div tw="w-full mt-8">
        {info?.map((_infoItem) => (
          <InfoItem key={_infoItem.name}>
            <div tw="flex items-center">
              <div tw="text-xs text-csp_neutral-contrast1 leading-[150%] font-semibold">
                {_infoItem.name}
              </div>
              <div tw="text-xs p-2.5 text-csp_neutral-contrast leading-[150%] font-semibold ml-[30px]">
                {_infoItem.detail}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChangeStep?.(_infoItem.step)}
              tw="text-brand text-xs leading-[150%] font-semibold"
            >
              Change
            </button>
          </InfoItem>
        ))}
      </div>
    </TabWrapper>
  );
};

type ProcessTabItemProps = {
  step: string;
  name: string;
  icon: React.ReactNode;
  status: "ready" | "active" | "done";
  onClick?: () => void;
};

const ProcessTabItem = ({
  step,
  name,
  icon,
  status,
  onClick,
}: ProcessTabItemProps) => {
  return (
    <ItemWrapper onClick={onClick}>
      <span
        tw="flex items-center justify-center"
        css={[
          status === "done" &&
            tw`border text-brand-100 border-brand-100 p-2.5  rounded-full`,
          status === "ready" && tw`text-csp_neutral-DarkBG`,
          status === "active" &&
            tw`p-2.5 border rounded-full text-brand border-brand bg-brand-100`,
        ]}
      >
        {icon}
      </span>
      {status === "active" && (
        <div tw="text-left ml-2">
          <div tw="text-brand font-semibold text-xs leading-[150%]">
            Step {step}
          </div>
          <div tw="text-csp_neutral-DarkBG font-bold text-sm leading-[150%]">
            {name}
          </div>
        </div>
      )}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  ${tw`flex items-center justify-center flex-grow border-r cursor-pointer h-11 border-brand-100 last-of-type:border-none last-of-type:justify-end first-of-type:justify-start last-of-type:pr-[15.5px] first-of-type:flex-grow-0 first-of-type:pr-8 last-of-type:flex-grow-0 last-of-type:pl-[47.5px]`}
`;

const TabWrapper = styled.div`
  ${tw`flex flex-col items-center py-[14px] px-8 mb-4 rounded-lg`}
  box-shadow: rgb(255 255 255 / 45%) 0px 0px 0px 3px,
    rgb(129 126 251 / 25%) 0px 1px 3px, rgb(98 70 234 / 29%) 0px 11px 24px -9px;
`;

const InfoItem = styled.div`
  ${tw`flex items-center justify-between`}
`;
