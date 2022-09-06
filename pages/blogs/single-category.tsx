import tw, { styled } from "twin.macro";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import React from "react"
import { Header } from "containers/main-layout/header";
import { Footer } from "containers/main-layout/footer";
import { BlogCategory } from "components/blog-singleCategory/Blog";
import { BlogPost } from "types";
import { fetchContent } from "graphql/contentful";
import { GET_BLOGS } from "graphql/queries/blogs";

const BlogSingleCategory = (props) => {

  const router = useRouter()
  return (
    <BlogPage>
      <Header />
      <Container>
        <MainWrapper>
          <div tw="mb-12">
            <div tw="flex items-center mb-[10px]">
              <ChevronLeftIcon tw="w-4 h-4 text-[#6246EA] mx-4" />
              <button tw="font-bold text-[14px] leading-[150%] text-[#6246EA]">All Categories</button>
            </div>
            <h1 tw="text-[60px]text-[#50497C] leading-[150%] font-medium mb-[10px]">Fix Your Credit</h1>
            <p tw="text-[16px] text-[#2C2836] font-normal leading-[200%]">
              The 800 Club Community is a precious resource full of experts in the industry and people just like who are on their journies to financial freedom.
            </p>
          </div>
          <LatestCard>
            <MainTitle>Lastest Post</MainTitle>
            <BlogCategory blog={props?.blogs[props?.blogs?.length - 1]} type="latest" />
          </LatestCard>
        </MainWrapper>
      </Container>
      <div>
        <img src="/img/wavesOpacity (1) 2.png" tw="w-full" />
      </div>
      <div tw="bg-white">
        <Container>
          <MainWrapper>
            <OurPicks tw="pt-[37px]">
              <MainTitle>Our Picks</MainTitle>
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
              <MainTitle>All Posts</MainTitle>]
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
        </MainWrapper>
      </Container>
      <Footer />
    </BlogPage>)
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

const LatestCard = styled.div`
  ${tw`pb-[48px] pt-[32px]`}
`;
const MainTitle = styled.h1`
  ${tw`text-[36px] leading-[36px] font-bold text-[#2C2836]`}
`;

const OurPicks = styled.div`
  
`;
const BlogItemContainer = styled.div`
  ${tw` block md:flex gap-[24px] relative flex-wrap`}
`;
export default BlogSingleCategory