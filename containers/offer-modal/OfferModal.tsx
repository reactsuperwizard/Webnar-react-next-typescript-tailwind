import { ChangeEvent } from "react";
import { XIcon } from "@heroicons/react/solid";
import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import Link from "next/link";

import { RadioButton, Stepper } from "../../components";
import loadingModalAnimData from "../../assets/lottie/loading_modal.json";
import { Survey } from "../../types";

type Direction = "bottom" | "top" | "left" | "right";

type OfferModalProps = {
  onCloseModal?: () => void;
  type?: "step" | "bar" | "case";
  from?: Direction;
  to?: Direction;
  currentStep: number;
  show?: boolean;
  steps?: Array<Survey>;
  onCheck?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const OfferModal = ({
  onCloseModal,
  type,
  steps,
  currentStep,
  onCheck,
  from,
  to,
  show,
}: OfferModalProps) => {
  const animVariants = {
    hidden: {
      y: show
        ? from === "bottom"
          ? "100vh"
          : from === "top"
          ? "-100vh"
          : "0"
        : "0",
      x: show
        ? from === "left"
          ? "-100vw"
          : from === "right"
          ? "100vw"
          : "0"
        : "0",
      opacity: show ? 1 : 0,
    },
    visible: {
      y: "0",
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 50,
        stiffness: 500,
      },
    },
    exit: {
      y: to === "bottom" ? "100vh" : to === "top" ? "-100vh" : "0",
      x: to === "left" ? "-100vw" : to === "right" ? "100vw" : "0",
      opacity: 0,
    },
  };

  return (
    <ModalWrapper
      onClick={(e) => e.stopPropagation()}
      variants={animVariants}
      animate={show ? "visible" : "exit"}
      initial="hidden"
      exit="exit"
    >
      {currentStep === steps.length + 1 ? (
        <>
          <div tw="flex flex-col items-center justify-center px-6 pb-6">
            <div tw="text-3xl leading-[150%] font-normal mt-[45px]">
              Excellent.&nbsp;
              <GradientText>Let's Do This!</GradientText>
            </div>
            <p tw="text-base leading-[150%] font-normal">
              Sit tight as we generate your Secure Checkout Page
            </p>
            <div tw="my-5">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: loadingModalAnimData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height="250px"
                width="250px"
              />
            </div>
            <div tw="text-xs leading-[150%] font-medium">
              You should be automatically redirected. If you aren't,{" "}
              <Link href="/">
                <a>
                  <span tw="text-brand-500">please click here.</span>
                </a>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <button
            tw="absolute top-4 right-4 text-csp_neutral-contrast"
            onClick={onCloseModal}
          >
            <XIcon tw="w-5 h-5" />
          </button>

          <div tw="flex justify-center mt-10">
            {type === "step" && (
              <Stepper
                darkMode={false}
                totalSteps={[
                  {
                    id: "1",
                    value: "1",
                  },
                  {
                    id: "2",
                    value: "2",
                  },
                  {
                    id: "3",
                    value: "3",
                  },
                ]}
                currentStep={currentStep}
              />
            )}
            {type === "case" && (
              <div tw="text-brand text-sm leading-[150%] font-bold">
                Question {currentStep} of {steps.length}
              </div>
            )}
            {type === "bar" && (
              <div tw="w-52">
                <ProgressBarWrapper
                  percent={(currentStep * 100) / steps.length}
                />
              </div>
            )}
          </div>

          <div tw="p-6 !pt-[0.5rem]">
            <h3 tw="font-bold text-2xl sm:text-3xl leading-[150%] text-center text-csp_neutral-contrast">
              {steps?.[currentStep - 1]?.question}
            </h3>
            <p tw="font-normal text-base leading-[150%] text-csp_neutral-DarkBG text-center py-6">
              {steps?.[currentStep - 1]?.description}
            </p>

            <ItemsWrapper>
              <ItemWrapper>
                <RadioButton
                  size="md"
                  value="yes"
                  renderLabel={() => <ItemLabel>Yes</ItemLabel>}
                  onChange={onCheck}
                  group="checked"
                />
              </ItemWrapper>
              <ItemWrapper>
                <RadioButton
                  group="checked"
                  size="md"
                  value="no"
                  renderLabel={() => <ItemLabel>No</ItemLabel>}
                  onChange={onCheck}
                />
              </ItemWrapper>
            </ItemsWrapper>
          </div>
        </>
      )}
    </ModalWrapper>
  );
};

const ModalWrapper = styled(motion.div)`
  ${tw` max-w-[calc(100vw - 20px)] sm:max-w-[525px] bg-white rounded-lg absolute`}

  background: radial-gradient(
    100.29% 142.13% at 100% 0%,
    #f4e9fc 0%,
    #e3e6f9 31.92%,
    #fafafe 68.12%
  );

  box-shadow: rgb(255 255 255 / 45%) 0px 0px 0px 3px,
    rgb(129 126 251 / 25%) 0px 1px 3px, rgb(98 70 234 / 29%) 0px 11px 24px -9px;
`;

const ItemsWrapper = styled.div`
  ${tw`bg-[#FAFAFE] rounded-lg overflow-hidden px-0`}

  box-shadow: rgb(255 255 255 / 45%) 0px 0px 0px 3px,
  rgb(129 126 251 / 25%) 0px 1px 3px, rgb(98 70 234 / 29%) 0px 11px 24px -9px;
`;

const ItemWrapper = styled.div`
  ${tw`px-0 transition-all duration-200 ease-in-out border-b border-b-brand-100`}
  @media(hover:hover) {
    &:hover {
      ${tw`bg-brand-100`}
    }
  }

  &:last-of-type {
    ${tw`border-none`}
  }
`;

const ItemLabel = styled.span`
  ${tw`px-[18px] py-[18px]  font-medium text-base leading-[150%] text-black`}
`;

const ProgressBarWrapper = styled.div<{
  percent?: number;
}>`
  ${tw`relative w-full h-[14px]  bg-brand-100 rounded-2xl`}

  &:after {
    ${tw`absolute top-0 left-0 bg-brand h-[14px] rounded-2xl`}
    content: "";
    width: ${({ percent }) => percent}%;
  }
`;

const GradientText = styled.span`
  ${tw`font-extrabold`}
  background: linear-gradient(90deg, #6246EA, #30D1CE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;
