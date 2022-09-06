import tw, { styled } from "twin.macro";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DownloadIcon,
  CalendarIcon,
  LibraryIcon,
  ClipboardListIcon,
} from "@heroicons/react/solid";

import { AdVideo } from "../containers/ad-video";
import { Testimonials } from "../containers/testimonials";
import { Button } from "../components";
import { AnimatedModal } from "../components/animated-modal";
import { useAmpli } from "../context";

import aPlusImage from "../assets/img/a-plus-rating.png";
import trustedSiteImage from "../assets/img/trusted-site.png";
import bookImage from "../assets/img/book.png";
import CheatSheetImage from "../assets/img/Frame.svg";
import LogoSvg from "../assets/img/Logo.svg";
import { fetchContent } from "graphql/contentful";
import { GET_TESTIMONIALS } from "graphql/queries";

const LandingPage = (props: any) => {
  const loadedRef = useRef(false);
  const ampli = useAmpli();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && loadedRef.current) {
      ampli.client.track({
        event_type: modalOpen ? "open modal" : "close modal",
        event_properties: {
          modal_type: "optin",
        },
      });
    }
  }, [modalOpen]);

  const handleDownloadCheatsheet = useCallback(
    (button_location: string) => {
      loadedRef.current = true;
      setModalOpen(true);

      ampli.client.track({
        event_type: "press button",
        event_properties: {
          button_type: "CTA",
          button_action: "load modal",
          button_goal: "download cheatsheet",
          button_location,
        },
      });
    },
    [ampli]
  );

  const onCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <PageBackground>
      <PageWrapper>
        <StyledHeader>
          <Link passHref href="">
            <a>
              <LogoSvg />
            </a>
          </Link>
          <div tw="flex items-center gap-x-4">
            <div tw="max-w-[56px] sm:max-w-[87px] flex items-center">
              <Link
                passHref
                href="http://www.bbb.org/greater-san-francisco/business-reviews/publishers-book/smart-consumer-solutions-llc-in-san-francisco-ca-382309/#bbbonlineclick"
              >
                <a target="_blank">
                  <Image src={aPlusImage} alt="A Plus Image" />
                </a>
              </Link>
            </div>
            <div tw="max-w-[76px] sm:max-w-[118px] flex items-center">
              <Image src={trustedSiteImage} alt="Trusted Image" />
            </div>
          </div>
        </StyledHeader>
        <div tw="mt-4 px-6">
          <h2 tw="text-2xl sm:text-4xl sm:leading-[54px] font-semibold text-center text-csp_neutral-contrast max-w-[627px] mx-auto px-6 md:px-0 my-4">
            Improve your credit score with our <GradientText>FREE</GradientText>{" "}
            cheatsheet
          </h2>

          <AdVideo pause={modalOpen} videoId="vsg7fjeyun" />

          <div tw="flex items-center justify-center py-8 sm:px-6">
            <Button
              icon={<DownloadIcon tw="w-6 h-6 md:w-[28px] md:h-[28px]" />}
              color="brand"
              variant="primary"
              size="xl"
              title="Get Free Cheatseet"
              onClick={() => handleDownloadCheatsheet("top")}
              tw="w-full md:w-[413px] text-[19.58px] leading-[29.37px] sm:text-[22.38px] sm:leading-[33.57px] md:h-[72px]"
            />
          </div>
        </div>
      </PageWrapper>
      <div>
        <img src="./img/wave-top.svg" tw="w-full" />
        <FeaturesSection tw="mt-[-1px] lg:-mt-1 text-csp_neutral-contrast">
          <header tw="py-4 sm:py-16">
            <h3 tw="font-semibold">What You&apos;ll Get in the Cheat Sheet:</h3>
          </header>
          <div tw="max-w-5xl mx-auto flex items-center flex-col sm:flex-row">
            <div tw="max-w-[300px] sm:max-w-5xl">
              <Image src={bookImage} alt="Book Image" />
            </div>
            <ul tw="px-6 sm:px-0">
              <li>
                <ClipboardListIcon tw="w-[65px] h-[65px] flex-shrink-0" />
                <dl>
                  <dt>Our 5-Step System</dt>
                  <dd>Steps anyone can follow to excellent credit</dd>
                </dl>
              </li>
              <li>
                <CalendarIcon tw="w-[65px] h-[65px]  flex-shrink-0" />
                <dl>
                  <dt>The 30-Day Kick Start</dt>
                  <dd>The fastest way to gain 50 to 100+ points</dd>
                </dl>
              </li>
              <li>
                <LibraryIcon tw="w-[65px] h-[65px]  flex-shrink-0" />
                <dl>
                  <dt>Your Federal Rights</dt>
                  <dd>
                    Leverage them and remove negatives from your credit report
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </FeaturesSection>
        <img src="./img/wave-bottom.svg" tw="w-full -mt-1" />
      </div>

      <Testimonials testimonials={props.testimonials} />

      <DownloadSection>
        <CheatSheetImage tw="scale-y-100 scale-x-75 -mt-2 sm:mt-0 sm:scale-100" />
        <div className="content">
          <h3>
            Download your <GradientText tw="font-black">FREE</GradientText>{" "}
            CheatSheet
          </h3>
          <p tw="text-csp_neutral-DarkBG">
            Start following the step-by-step system for improving your credit
            score
          </p>
          <div tw="flex items-center justify-center py-2 mt-8 sm:mt-[52px] md:mt-[60px]">
            <StyledButton
              icon={<DownloadIcon tw="w-5 h-5" />}
              color="brand"
              variant="primary"
              size="xl"
              title="Get Free Cheatseet"
              onClick={() => handleDownloadCheatsheet("bottom")}
              tw="w-full sm:w-[245px] h-[52px] relative px-10 whitespace-nowrap"
            />
          </div>
        </div>
      </DownloadSection>

      <Footer>
        <Link passHref href="">
          <a>
            <LogoSvg />
          </a>
        </Link>
        <div
          className="content"
          tw="flex justify-end flex-col items-center sm:items-end py-[21px] sm:py-0"
        >
          <p>All Rights Reserved. The Credit Solution Program</p>
          <nav>
            <ul>
              <li>
                <Link passHref href="">
                  <a>Disclaimer</a>
                </Link>
              </li>
              <li>
                <Link passHref href="">
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link passHref href="">
                  <a>Terms of Use</a>
                </Link>
              </li>
              <li>
                <Link passHref href="">
                  <a>Disclosure</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Footer>

      <AnimatePresence>
        {modalOpen && (
          <AnimatedModal
            onClick={() => setModalOpen(false)}
            onCloseModal={onCloseModal}
          />
        )}
      </AnimatePresence>
    </PageBackground>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const contents = await fetchContent(GET_TESTIMONIALS);

    const items = contents?.testimonialCollection?.items;

    return {
      props: {
        testimonials: items ?? null,
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

const PageBackground = styled.div`
  background: radial-gradient(
    100% 121.16% at 100% 0%,
    #f4e9fc 0%,
    #e3e6f9 31.92%,
    #fafafe 68.12%
  );

  box-shadow: 0px 1px 3px rgba(129, 126, 251, 0.13),
    0px 9px 21px -16px rgba(98, 70, 234, 0.07);
  border-radius: 8px;
`;

const StyledHeader = styled.header`
  ${tw`flex items-center justify-between px-6 py-2`}
`;

const PageWrapper = styled.div`
  ${tw`max-w-5xl mx-auto`}
`;

const GradientText = styled.span`
  ${tw`font-extrabold`}
  background: linear-gradient(90deg, #6246EA, #30D1CE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const FeaturesSection = styled.section`
  ${tw`pb-16 bg-brand-100`}

  h3 {
    ${tw`font-bold text-2xl sm:text-3xl leading-[150%] text-center`}
  }

  ul {
    li {
      ${tw`flex items-center text-brand  mb-[42px]`}
      dl {
        ${tw`ml-4 text-csp_neutral-DarkBG`}
        dt {
          ${tw`text-xl font-bold leading-[150%]`}
        }
        dd {
          ${tw`text-base leading-[150%] font-medium`}
        }
      }
    }
  }
`;

const DownloadSection = styled.section`
  ${tw`relative flex items-center justify-center py-10 text-center sm:py-32`}
  svg {
    ${tw`absolute -top-12 sm:top-0`}
    z-index: 0;
  }

  button {
    svg {
      ${tw`relative top-auto`}
    }
  }

  div.content {
    position: relatvie;
    z-index: 1;
    ${tw`px-6`}

    h3 {
      ${tw`font-bold md:font-bold text-3xl leading-[150%] text-csp_neutral-600`}
    }

    p {
      ${tw`text-base  leading-[200%] text-[rgba(44, 40, 54, 1)]`}
    }
  }
`;

const Footer = styled.footer`
  ${tw`flex items-center justify-between py-[21px] px-6 mt-16 sm:mt-auto max-w-5xl mx-auto flex-col sm:flex-row`}

  p {
    ${tw`text-xs  sm:text-sm leading-[150%] text-csp_neutral-contrast1`}
  }

  nav {
    ul {
      ${tw`flex items-center`}
      li {
        ${tw`flex items-center justify-center px-2 border-r border-r-csp_neutral-contrast1`}

        a {
          ${tw`text-xs sm:text-sm leading-[150%] text-csp_neutral-contrast1 whitespace-nowrap `}
        }

        &:last-of-type {
          ${tw`pr-0 border-none`}
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  box-shadow: 0px 9px 19px #c5caff;
`;

export default LandingPage;
