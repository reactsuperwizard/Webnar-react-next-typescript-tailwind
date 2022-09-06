import Image from "next/image";
import tw, { styled } from "twin.macro";
import Slider from "react-slick";

import { Testimonial } from "../../types";
import QuoteMark from "../../assets/icons/quote-mark.svg";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export const Testimonials = ({ testimonials, ...rest }: TestimonialsProps) => {
  const settings = {
    centerMode: true,
    slidesToShow: 4,
    speed: 500,
    infinite: true,
    centerPadding: "-400px",
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "-100px",
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "150px",
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 1296,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "300px",
        },
      },
      {
        breakpoint: 1156,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerPadding: "120px",
        },
      },
      {
        breakpoint: 964,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "120px",
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 325,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <SlideWrapper {...rest}>
      <Slider tw="w-full h-[300px]" {...settings}>
        {testimonials.map((_thoughtItem) => (
          <div
            tw="flex items-center h-full w-[248px]  sm:w-[528px] mx-auto"
            key={_thoughtItem.sys.id}
          >
            <SlideItem isActive={true}>
              <div tw="flex items-center justify-between">
                <div tw="flex items-center gap-x-2.5 py-2.5">
                  <div tw="relative w-10 h-10 rounded-full flex flex-shrink-0 items-center  overflow-hidden">
                    <Image src={_thoughtItem.avatar.url} layout="fill" />
                  </div>
                  <span tw="text-gray-800 text-sm font-bold leading-[150%]">
                    {_thoughtItem.userName}
                  </span>
                </div>
                <QuoteMark tw="text-brand-100 hidden sm:block" />
              </div>
              <div tw="text-csp_neutral-contrast text-sm leading-[150%]">
                {_thoughtItem.content}
              </div>
            </SlideItem>
          </div>
        ))}
      </Slider>
    </SlideWrapper>
  );
};

const SlideItem = styled.div<{
  isActive: boolean;
}>`
  ${tw`flex flex-col px-10 py-4 rounded-2xl w-[calc(100vw - 48px)] sm:w-[428px]  md:w-[calc(100vw - 300px)] lg:w-[528px] cursor-pointer md:mx-auto bg-white bg-opacity-25 my-auto`}
  filter: drop-shadow(0px 50px 75px #8B69C5);
`;

const SlideWrapper = styled.div`
  ${tw`flex items-center my-16 overflow-visible`}

  .slick-list {
    ${tw`overflow-visible h-[240px]`}

    .slick-track {
      ${tw`h-full`}

      .slick-slide {
        ${tw`flex items-center justify-center`}
      }
    }
  }
`;
