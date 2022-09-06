import tw, { styled } from "twin.macro";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  CalendarIcon,
  ClockIcon,
  ThumbUpIcon,
  ChatAltIcon,
} from "@heroicons/react/solid";

// import { Embed, CommentCount } from "hyvor-talk-react";

import { Header } from "../../containers/main-layout/header";
import { Footer } from "../../containers/main-layout/footer";
import { fetchContent } from "../../graphql/contentful";
import { GET_BLOGS, GET_BLOG_BY_SLUG } from "../../graphql/queries/blogs";
import { Breadcrumb } from "components/breadcrumb";
import dollarImage from "../../assets/img/user_imgs/dollar.png";
import DanielImage from "../../assets/img/user_imgs/daniel.png";
import { Person } from "../../components/person";
import BookImage from "../../assets/img/bookche.svg";

const BlogDetailPage = (props) => {
  return (
    <div>
      <Header />
      <PageWrapper>
        <div tw="mb-6">
          <Breadcrumb
            breadcrumbs={[
              { label: "Articles", name: "articles", active: true },
              { label: "Categoy", name: "categoy", active: false },
            ]}
          />
        </div>
        <BlogMainInfo>
          <div tw="md:flex items-center gap-[16px]">
            <h1 tw="my-2 bg-[#FFE688] text-[12px] leading-[18px] font-semibold rounded-[6px] inline-block px-4 text-[#723B13]">
              Category
            </h1>
            <div tw="flex items-center justify-between md:gap-[16px]">
              <span tw="flex items-center text-[12px] text-[#50497C] font-semibold leading-[150%]">
                <CalendarIcon tw="text-[#50497C] w-[16px] h-[16px] inline-block pr-1" />
                <span>Uptated July 17, 2022</span>
              </span>
              <span tw="flex items-center text-[12px] text-[#50497C] font-semibold leading-[150%]">
                <ClockIcon tw="w-[16px] h-[16px] inline-block pr-1" />
                <span>8 Minute Read</span>
              </span>
            </div>
          </div>
          <h1 tw="pt-6 text-[#2C2836] text-[30px] leading-[150%] font-bold mb-6">
            {props?.blog?.title}
          </h1>
          <div tw="mb-6 md:flex justify-between items-center">
            <Person name="Danial Sater" image={DanielImage} />
            <div tw="hidden md:flex md:items-center md:gap-[24px]">
              <span tw="flex items-center text-[14px] leading-[150%] text-[#50497C] gap-[8px] font-medium">
                <ThumbUpIcon tw="w-[32px] h-[32px] p-[6px] border-2 border-[#50497C] border-solid text-[#50497C] rounded-full" />
                <span>184</span>
              </span>
              <span tw="flex items-center text-[14px] leading-[150%] text-[#50497C] gap-[8px] font-medium">
                <ChatAltIcon tw="w-4 h-4 text-[#50497C]" />
                <span>
                  <CommentCount id="" websiteId={7498} /> Comments
                </span>
              </span>
            </div>
          </div>
          <ImageWrapper tw="relative w-full h-[calc(100vw - 102px)] max-h-[522px] rounded-[8px]">
            <Image
              layout="fill"
              src={
                props?.blog?.featureImage
                  ? props.blog.featureImage.url
                  : dollarImage
              }
              alt={props?.blog?.featureImage?.title}
              title={props?.blog?.featureImage?.fileName}
              tw="rounded-[8px]  object-cover"
            />
          </ImageWrapper>
        </BlogMainInfo>
        <ContentWrapper>
          {documentToReactComponents(props?.blog?.content?.json)}
          <div tw="flex mt-[-20px] mb-5 gap-2">
            <img
              src="/img/PinterestDark.svg"
              width="32px"
              height="32px"
              tw="p-2 rounded-[8px] border-2 border-[#50497C] border-solid"
            />
            <img
              src="/img/mail.svg"
              width="32px"
              height="32px"
              tw="p-2 border-2 rounded-[8px] border-[#50497C] border-solid"
            />
            <img
              src="/img/facebook-f.svg"
              width="32px"
              height="32px"
              tw="p-2 rounded-[8px] border-2 border-[#50497C] border-solid"
            />
            <img
              src="/img/twitter.svg"
              width="32px"
              height="32px"
              tw="p-2 rounded-[8px] border-2 border-[#50497C] border-solid"
            />
          </div>
        </ContentWrapper>
        <CreditLogin>
          <div tw="hidden md:block">
            <BookImage />
          </div>
          <CheatSheet>
            <h1 tw="text-[30px] leading-[45px] font-bold text-[#FAFAFE] text-center mb-8">
              Improve your credit score with our FREE cheatsheet
            </h1>
            <label>
              <span tw="text-[18px] text-[#fff] leading-[24px font-medium] mb-2 block">
                Emial Address
              </span>
              <div tw="md:flex md:items-center md:gap-[10px]">
                <EmailInput />
                <button tw="text-[14px] font-medium text-[#000] leading-[21px] px-[20px] py-[10px] bg-[ #FFE688] rounded-[8px] w-[100%]">
                  Get The Cheatsheet
                </button>
              </div>
            </label>
          </CheatSheet>
        </CreditLogin>
        <PersonInfo>
          <div tw="w-[72px] relative h-[73px]">
            <Image src={DanielImage} layout="fill" />
          </div>
          <div tw="w-[calc(100% - 88px)]">
            <span tw="text-[20px] leading-[30px] text-[#50497C] font-bold mb-[16px] block">
              Daniel Sater
            </span>
            <p tw="text-[16px] text-[#50497C] leading-[24px] mb-4">
              For the sake of looking at the math, we&lsquo;re going to start
              with Suzie Spendthrift, who has three major debts to get rid of.
              Here&lsquo;s what she owes:
            </p>
            <p tw="text-[16px] text-[#50497C] leading-[24px]">
              For this comparison, let&lsquo;s assume that the interest rates on
              these debts are equal at 5%, and that Suzie is able to spend $50
              extra each month to get rid of her debt. We&lsquo;ll also assume
              her minimum payment on each loan is $50.
            </p>
          </div>
        </PersonInfo>
        <LikeBlogGroup></LikeBlogGroup>
        <Embed websiteId={7498} />
      </PageWrapper>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  try {
    const res = await fetchContent(GET_BLOG_BY_SLUG(slug as string));

    return {
      props: {
        blog: res?.blogPostCollection?.items[0],
      },
    };
  } catch (e) {
    return {
      props: {
        blog: null,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetchContent(GET_BLOGS);
    const items = res?.blogPostCollection?.items;

    const params = items.map((_item) => ({
      params: {
        slug: _item.slug,
      },
    }));

    return {
      paths: [...params],
      fallback: false,
    };
  } catch (e) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export default BlogDetailPage;

const ContentWrapper = styled.div`
  p {
    ${tw`text-[16px] leading-[32px] font-normal text-[#2C2836] py-5`}
    b {
      ${tw`text-[24px] text-[#000000]`}
    }
  }
`;

const PageWrapper = styled.main`
  ${tw`max-w-[912px] mx-auto px-6 mt-[-4px]`}
`;
const BlogMainInfo = styled.div``;
const ImageWrapper = styled.div`
  ${tw``}
`;
const CreditLogin = styled.div`
  ${tw`flex items-center justify-between`}
  background: linear-gradient(77.03deg, #6246EA 8.85%, #30D1CE 90.13%);
  border-radius: 7.46961px;
`;
const EmailInput = styled.input`
  ${tw`block w-[100%] h-[42px] mb-4 md:mb-[0px]`}
  background: #FFFFFF;
  border: 1px solid #bcbccd;
  border-radius: 8px;
`;
const CheatSheet = styled.div`
  ${tw`px-[20px] py-[34px]`}
`;
const PersonInfo = styled.div`
  ${tw`flex items-start justify-between mt-9 mb-9`}
`;

const LikeBlogGroup = styled.div``;
