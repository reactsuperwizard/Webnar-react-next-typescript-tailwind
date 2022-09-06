import tw, { styled } from "twin.macro";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Header } from "../../containers/main-layout/header";
import { Footer } from "../../containers/main-layout/footer";
import { Blog, BlogCard, SmallBlog } from "../../components/blog";
import { BlogCardType, BlogPost } from "../../types";
import { fetchContent } from "../../graphql/contentful";
import { GET_BLOGS, GET_CATEGORIES } from "../../graphql/queries/blogs";

const BlogHomePage = (props) => {
  const router = useRouter();

  const cardBlogs: BlogCardType[] = [
    {
      title: "Fix Your Credit",
      url: "/img/fix.svg",
    },
    {
      title: "Credit Cards",
      url: "/img/creditCards.svg",
    },
    {
      title: "Debt Help",
      url: "/img/debt.svg",
    },
    {
      title: "Home Buying",
      url: "/img/home.svg",
    },
    {
      title: "Saving",
      url: "/img/saving.svg",
    },
    {
      title: "Retirement",
      url: "/img/retirement.svg",
    },
  ];
  // const [fixTarget, setFixTarget] = React.useState();
  // const [creditTarget, setCreditTarget] = React.useState();
  // const handleOnChangeFixImage = (item: BlogPost) => {
  //   setFixTarget(item)

  // }
  // const handleOnChangeCreditImage = (item: BlogPost) => {
  //   setCreditTarget(item)

  // }

  console.log(props?.categories);

  return (
    <BlogPage>
      <Header />
      <Container>
        <MainWrapper>
          <div>
            <h1 tw="text-[48px] md:text-[69px] text-[#50497C] text-center leading-[150%] font-medium">
              This is a title.
              <GradientText tw="hidden md:inline"> Expert.</GradientText>
              <p tw="text-center text-[16px] text-[#2C2836] font-normal leading-[200%]">
                The 800 Club Community is a precious resource full of experts in
                the industry and people just like who are on their journies to
                financial freedom. Join the community today to see why
                it&lsquo;s one of the most benificial parts of our program.
              </p>
            </h1>
          </div>
          <CategoriesWrapper>
            {cardBlogs.map((item, index) => (
              <BlogCard blogCard={item} key={index} />
            ))}
          </CategoriesWrapper>
          <LatestCard>
            <MainTitle>Lastest Post</MainTitle>
            <Blog
              blog={props?.blogs?.[props?.blogs?.length - 1]}
              type="latest"
            />
          </LatestCard>
          <OurPicks>
            <MainTitle>Our Picks</MainTitle>
            <BlogItemContainer>
              {props?.blogs?.splice(0, 3).map((_blogItem: BlogPost) => (
                <Blog
                  key={_blogItem?.sys.id}
                  blog={_blogItem}
                  type="normal"
                  onClick={() => router.push(`/blogs/${_blogItem.slug}`)}
                />
              ))}
            </BlogItemContainer>
          </OurPicks>
          <FixYourCredit>
            <MainTitle>Fix Your Credit</MainTitle>
            <BlogContentGroup>
              <Blog blog={props?.blogs?.[0]} type="featured" />
              <SmallBlogGroups>
                {props?.blogs?.splice(0, 5).map((item, ind) => (
                  <SmallBlog
                    key={ind}
                    blog={item}
                    onClick={() => router.push(`/blogs/${item.slug}`)}
                  />
                ))}
              </SmallBlogGroups>
            </BlogContentGroup>
          </FixYourCredit>
          <CreditCards>
            <MainTitle>Credit Cards</MainTitle>
            <BlogContentGroup>
              <Blog blog={props?.blogs[0]} type="featured" />
              <SmallBlogGroups>
                {props?.blogs?.map((item, ind) => (
                  <SmallBlog
                    key={ind}
                    blog={item}
                    onClick={() => router.push(`/blogs/${item.slug}`)}
                  />
                ))}
              </SmallBlogGroups>
            </BlogContentGroup>
          </CreditCards>
        </MainWrapper>
      </Container>
      <Footer />
    </BlogPage>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const contents = await fetchContent(GET_BLOGS);
    const catRes = await fetchContent(GET_CATEGORIES);

    const items = contents?.blogPostCollection?.items;

    const categories = catRes?.categoryCollection?.items;

    return {
      props: {
        blogs: items ?? null,
        categories: categories ?? null,
      },
    };
  } catch (error) {
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
const GradientText = styled.span`
  ${tw`font-extrabold`}
  background: linear-gradient(90deg, #6246EA, #30D1CE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const CategoriesWrapper = styled.div`
  ${tw`flex gap-[29px] mt-[48px] mb-[70px]`}
`;
const LatestCard = styled.div`
  ${tw`mb-[155px]`}
`;
const OurPicks = styled.div``;
const MainTitle = styled.h1`
  ${tw`text-[36px] leading-[36px] font-bold text-[#2C2836] mb-8`}
`;
const BlogItemContainer = styled.div`
  ${tw` block md:flex md:justify-between  md:flex-wrap relative`}
`;
const FixYourCredit = styled.div`
  ${tw`mt-[200px] mb-[45px]`}
`;
const BlogContentGroup = styled.div`
  ${tw`block lg:flex lg:items-start lg:justify-between gap-[125px]`}
`;
const SmallBlogGroups = styled.ul`
  ${tw`hidden ml-6 lg:block`}
`;
const CreditCards = styled.div`
  ${tw`mt-[88px] block md:hidden lg:block`}
`;
export default BlogHomePage;
