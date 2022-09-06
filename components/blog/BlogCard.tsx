import tw, { styled } from "twin.macro";

import { CardContent } from "./CardContent";
import { BlogCardButton } from "./BlogCardButton";
type BlogCardProps = {
  blogCard?: {
    url: string;
    title: string;
  };
};

export const BlogCard = ({ blogCard, ...rest }: BlogCardProps) => {
  return (
    <div
      {...rest}
      tw="relative w-[150px] min-w-[150px] h-[230px] rounded-[8px]"
    >
      <CardImage src={blogCard.url} />
      <CardContent title={blogCard.title} />
      <BlogCardButton />
    </div>
  );
};

const CardImage = styled.img`
  position: absolute;
  bottom: 94px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 99999;
`;
