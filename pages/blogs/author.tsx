import tw, { styled } from "twin.macro";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react"

import { Header } from "containers/main-layout/header";
import { Footer } from "containers/main-layout/footer";
import { BlogCategory } from "components/blog-singleCategory/Blog";
import { BlogPost } from "types";
import { fetchContent } from "graphql/contentful";
import { GET_BLOGS } from "graphql/queries/blogs";
import DanielImage from "assets/img/user_imgs/daniel.png";

const BlogAuthor = (props) => {
  const router = useRouter()
  return (
    <BlogPage>
      <Header />
      <div>
        <img src="/img/wavesOpacity (1) 2.png" tw="w-full" />
      </div>
      <div tw="bg-white">
        <Container>
          <MainWrapper>
            <div tw="flex items-start justify-between">
              <Image
                src={DanielImage}
                width="144px"
                height="144px"
                tw="rounded-full"
              />
              <div tw="ml-[32px]">
                <div tw="flex justify-between items-center mb-6">
                  <h1 tw="text-[48px] leading-[150%] font-normal text-[#50497C]">Daniel Sater</h1>
                  <div tw="flex gap-2">
                    <img src="/img/PinterestDark.svg" width="32px" height="32px" tw="p-2 rounded-[8px] border-2 border-[#50497C] border-solid" />
                    <img src="/img/mail.svg" width="32px" height="32px" tw="p-2 border-2 rounded-[8px] border-[#50497C] border-solid" />

                  </div>
                </div>
                <p tw="mb-6 font-normal text-[17px] leading-[200%] text-[#2C2836]">The 800 Club Community is a precious resource full of experts in the industry and people just like who are on their journies to financial freedom.  </p>
                <p tw="mb-6 font-normal text-[17px] leading-[200%] text-[#2C2836]">
                  The 800 Club Community is a precious resource full of experts in the industry.</p>
              </div>
            </div>
          </MainWrapper>
        </Container>
      </div>

      <div>
        <img src="/img/wavesOpacity (1) 1.png" tw="w-full" />
      </div>
      <Container>
        <MainWrapper>
          <OurPicks tw="pt-[48px]">
            <div tw="flex items-center justify-between mb-[19px] pb-[26px]">
              <MainTitle>Articles By Daniel</MainTitle>]
              <select tw="w-[268px] p-3 text-[#2C2836] text-[14px] leading-[125%] font-medium rounded-[8px] border-[#BCBCCD]">
                <option>Sort By...</option>
              </select>
            </div>
            <BlogItemContainer>
              {props?.blogs?.map((_blogItem: BlogPost) => (
                <BlogCategory
                  key={_blogItem?.sys.id}
                  blog={_blogItem}
                  type="normal"
                  onClick={() => router.push(`/blogs/${_blogItem.slug}`)}
                />
              ))}
            </BlogItemContainer>
          </OurPicks>
          <App />
        </MainWrapper>
      </Container>
      <Footer />
    </BlogPage>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const contents = await fetchContent(GET_BLOGS);

    const items = contents?.blogPostCollection?.items;

    return {
      props: {
        blogs: items ?? null,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: (error as Error).message,
      },
    };
  }
};

const BlogPage = styled.div`
  background: radial-gradient(
    97% 105.49% at 100% -2.94%,
    #f4e9fc 0%,
    #e3e6f9 31.92%,
    #fafafe 68.12%
  );
`;
const Container = styled.div`
  ${tw`max-w-[1088px] m-auto p-[24px]`}
`;
const MainWrapper = styled.div``;
const MainTitle = styled.h1`
  ${tw`text-[36px] leading-[36px] font-bold text-[#2C2836] `}
`;

const OurPicks = styled.div`
  
`;
const BlogItemContainer = styled.div`
  ${tw` block md:flex md:justify-between  md:flex-wrap relative`}
`;


const PHOTO_URL =
  "https://www.kindacode.com/wp-content/uploads/2021/06/cute-dog.jpeg";

const App = () => {
  // The content of the target box
  const [content, setContent] = React.useState<string>("Drop Something Here");

  // This function will be triggered when you start dragging
  const dragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: string
  ) => {
    event.dataTransfer.setData("text", data);
  };

  // This function will be triggered when dropping
  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    setContent(data);
  };

  // This makes the third box become droppable
  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div
        className="box1"
        onDragStart={(event) => dragStartHandler(event, PHOTO_URL)}
        draggable={true}
      >
        <img src={PHOTO_URL} alt="Cute Dog" />
      </div>

      <div
        className="box2"
        onDragStart={(event) => dragStartHandler(event, "Kindacode.com")}
        draggable={true}
      >
        <h2>Kindacode.com</h2>
      </div>

      <div className="box3" onDragOver={allowDrop} onDrop={dropHandler}>
        {content.endsWith(".jpeg") ? <img src={content} /> : <h2>{content}</h2>}
      </div>
    </div>
  );
};

export default BlogAuthor 