import tw, { styled } from "twin.macro";

import Image from "next/image";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

import { BlogPost } from "../../types";

import { Button } from "../button";
import dollarImage from "../../assets/img/user_imgs/dollar.png";
import DanielImage from "assets/img/user_imgs/daniel.png";

type BlogProps = {
  blog?: BlogPost;
  type: "latest" | "normal";
  onClick?: () => void;
};

export const BlogCategory = ({ blog, type, onClick }: BlogProps) => {
  return (
    <BlogContainer type={type}>
      <ImageWrapper type={type}>
        <Image
          layout="fill"
          src={blog?.featureImage ? blog.featureImage.url : dollarImage}
          alt={blog?.featureImage?.title}
          title={blog?.featureImage?.fileName}
          tw="rounded-[8px]  object-cover"
        />
      </ImageWrapper>
      <BlogContent type={type}>
        <Title type={type}>{blog?.title}</Title>
        <Description type={type}>{blog?.shortDescription}</Description>

        {type === "latest" && (
          <div tw="flex items-end justify-between absolute bottom-[-113px] right-[0px] w-[100%] pl-[37px]">
            <div tw="hidden md:flex md:items-center">
              <Image
                src={DanielImage}
                width="50px"
                height="50px"
                tw="rounded-full"
              />
              <div tw="ml-[15px]">
                <dl tw="text-xs font-bold text-[#BCBCCD] leading-[18px]">
                  WRITTEN BY
                </dl>
                <dt tw="text-lg leading-[150%] font-semibold text-csp_neutral-contrast">
                  Danial Sater
                </dt>
              </div>
            </div>
            <Button
              variant="primary"
              title="Read Post"
              color="brand"
              size="base"
              tw="px-[11px]"
              icon={<ArrowCircleRightIcon tw="h-5 w-5" />}
              onClick={onClick}
              type="featured"
            />
          </div>

        )}
        <Button
          variant="primary"
          title="Read Post"
          color="brand"
          size="base"
          tw="px-[11px]"
          icon={<ArrowCircleRightIcon tw="h-5 w-5" />}
          onClick={onClick}
          type={type}
        />
      </BlogContent>
    </BlogContainer >
  );
};

const BlogContainer = styled.div<{
  type: "latest" | "normal";
}>`
  ${tw`relative`}
  ${({ type }) =>
    type === "latest"
      ? tw`block md:flex md:items-start md:relative`
      : tw`block mb-12 md:w-[31%]`}
`;
const ImageWrapper = styled.div<{
  type: "latest" | "normal";
}>`
  
  ${({ type }) =>
    type === "latest"
      ? tw`w-[100%] h-[220px] md:w-[430px] lg:h-[323px] relative mb-[17px] md:mb-[0px] rounded-[8px]`
      : type === "normal"
        ? tw`w-[100%] h-[222px] md:h-[152px] lg:h-[222px] mb-[17px] relative rounded-[8px]`
        : tw` h-[213px] relative w-[100%] h-[240px] lg:h-[346px] rounded-[8px]`}
`;
const BlogContent = styled.div<{
  type: "latest" | "normal";
}>`
  ${tw`relative`}
  ${({ type }) =>
    type === "latest"
      ? tw`w-[100%] md:w-[calc(100% - 430px)] pl-[0px] md:pl-[37px]`
      : type === "normal"
        ? tw``
        : tw``}
`;
const Title = styled.h1<{
  type: "latest" | "normal";
}>`
  ${tw`text-[30px] text-[#2C2836] leading-[30px] font-semibold`}
  -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  ${({ type }) =>
    type === "latest"
      ? tw`mb-[43px]`
      : type === "normal"
        ? tw`mb-[17px]`
        : tw`mt-[24px] mb-[26px]`}
`;
const Description = styled.p<{
  type: "latest" | "normal";
}>`
  ${tw`text-[16px] leading-[200%] font-normal text-[#50497C]`}
      -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  ${({ type }) =>
    type === "latest"
      ? tw`mb-[65px]`
      : type === "normal"
        ? tw`mb-[16px]`
        : tw`mb-[16px]`}
`;
