import Image from "next/image";

type PersonProps = {
  name: string;
  image: StaticImageData;
};
export const Person = ({ name, image }: PersonProps) => {
  return (
    <div tw="flex items-center">
      <Image src={image} width="50px" height="50px" tw="rounded-full" />
      <div tw="ml-[15px]">
        <dl tw="text-xs font-bold text-[#BCBCCD] leading-[18px]">WRITTEN BY</dl>
        <dt tw="text-lg leading-[150%] font-semibold text-csp_neutral-contrast">
          {name}
        </dt>
      </div>
    </div>
  );
};
