import tw, { styled } from "twin.macro";
import Image from "next/image";
import { BlogPost } from "types";
import dollarImage from "../../assets/img/user_imgs/dollar.png";
type SmallBlogProps = {
  blog?: BlogPost;

  onClick?: () => void;
};
export const SmallBlog = ({ blog, ...rest }: SmallBlogProps) => {
  return (
    <div {...rest} tw="flex items-center mb-4">
      <Image
        src={blog?.featureImage ? blog.featureImage.url : dollarImage}
        alt={blog?.featureImage?.title}
        title={blog?.featureImage?.fileName}
        width="88px"
        height="66px"
        tw="rounded-[8px]"
      />
      <span tw="text-[#2C2836] text-[16px] font-bold leading-[150%] ml-4 w-[calc(100% - 112px)]">
        {blog.title}
      </span>
    </div>
  );
};
