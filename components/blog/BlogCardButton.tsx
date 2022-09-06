import tw, { styled } from "twin.macro";
import { ChevronRightIcon } from "@heroicons/react/outline";

export const BlogCardButton = () => {
  return (
    <button tw="absolute w-[35px] h-[35px] bg-[#6246EA] rounded-full bottom-[0] left-[55px]">
      <ChevronRightIcon tw="text-white w-[12px] h-[12px] m-auto" />
    </button>
  );
};
