import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { DownloadIcon, XIcon } from "@heroicons/react/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import tw, { styled } from "twin.macro";
import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "../../components/button";
import { CustomInput } from "../../components/custom-input";
import { Backdrop } from "../../components/backdrop";

import UserImage from "../../assets/img/user_imgs/karen.png";
import QuoteMark from "../../assets/icons/quote-mark.svg";
import { useAmpli } from "../../context";

const dropIn = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 45,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

type AnimatedModalProps = {
  onClick: () => void;
  onCloseModal?: () => void;
};

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email Address is required"),
  })
  .required();

export const AnimatedModal = ({
  onClick,
  onCloseModal,
}: AnimatedModalProps) => {
  const ampli = useAmpli();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((data) => {}, []);

  const onClickSubmit = useCallback(() => {
    ampli.client.track({
      event_type: "submit form",
      event_properties: {
        validated: isValid,
        form_type: "optin",
      },
    });
  }, [isValid]);

  return (
    <Backdrop tw="flex items-center justify-center">
      <ModalWrapper
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button
          tw="absolute top-4 right-4 text-csp_neutral-contrast"
          onClick={onCloseModal}
        >
          <XIcon tw="w-5 h-5" />
        </button>
        <h3 tw="text-csp_neutral-contrast font-bold text-2xl sm:text-3xl leading-[150%] text-center mb-4">
          Enter your first name and email below
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <CustomInput
              label="First Name*"
              placeholder="Enter First Name"
              state={
                errors.firstName?.message
                  ? "danger"
                  : !!watch("firstName")
                  ? "success"
                  : "normal"
              }
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <CustomInput
              label="Email Address*"
              placeholder="Enter Email Address"
              state={
                errors.email?.message
                  ? "danger"
                  : !!watch("email")
                  ? "success"
                  : "normal"
              }
              {...register("email")}
              error={errors.email?.message}
              tw="my-4"
            />
          </div>

          <Button
            title="Download Now"
            icon={<DownloadIcon tw="w-5 h-5" />}
            color="brand"
            variant="primary"
            tw="mt-4 text-base"
            fullWidth
            type="submit"
            onClick={onClickSubmit}
          />
        </form>
        <CardWrapper>
          <div tw="flex items-center justify-between">
            <div tw="flex items-center gap-x-2.5 py-2.5">
              <div tw="relative w-10 h-10 rounded-full flex items-center   overflow-hidden ">
                <Image src={UserImage} layout="fill" />
              </div>
              <span tw="text-gray-800 text-sm font-bold leading-[150%]">
                Vanessa Serskdgns
              </span>
            </div>
            <div tw="scale-[0.7]">
              <QuoteMark />
            </div>
          </div>
          <p tw="text-csp_neutral-contrast text-sm leading-[150%] py-4">
            I followed these 5 steps and was able to increase my credit score by
            116 points. It really does work!
          </p>
        </CardWrapper>
      </ModalWrapper>
    </Backdrop>
  );
};

const CardWrapper = styled.div`
  ${tw`flex flex-col p-4 mt-4 bg-white bg-opacity-[0.4] rounded-2xl`}
  filter: drop-shadow(0px 50px 75px #8B69C5);
`;

const ModalWrapper = styled(motion.div)`
  ${tw` max-w-[350px] sm:max-w-[458px] px-6 py-12 bg-white rounded-lg relative`}
  background: radial-gradient(97% 105.49% at 100% -2.94%, #F4E9FC 0%, #E3E6F9 31.92%, #FAFAFE 68.12%);
  box-shadow: 0px 1px 3px rgba(129, 126, 251, 0.13),
    0px 9px 21px -16px rgba(98, 70, 234, 0.07);
`;
