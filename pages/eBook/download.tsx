import tw, { styled } from "twin.macro";
import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "@heroicons/react/solid";

import { Button } from "../../components";
import { Footer } from "../../containers/layout/footer";

import { useAmpli } from "../../context";

import bookImage from "../../assets/img/book.png";
import CheatSheetImage from "../../assets/img/Frame.svg";
import LogoSvg from "../../assets/img/Logo.svg";
import aPlusImage from "../../assets/img/a-plus-rating.png";
import trustedSiteImage from "../../assets/img/trusted-site.png";
import { useCallback } from "react";

const EBookDownloadPage = () => {
  const ampli = useAmpli();

  const onClickDownload = useCallback(() => {
    ampli.client.track({
      event_type: "download leadmagnet",
      event_properties: {
        name: "5 Steps to an 800 Score Cheat Sheet",
        type: "cheatsheet",
        url: "https://www.thecreditsolutionprogram.com/resources/5_steps_cheatsheet_2022.pdf",
      },
    });
  }, [ampli]);

  const onClickLearnMore = useCallback(() => {
    ampli.client.track({
      event_type: "pressed button",
      event_properties: {
        type: "cta",
        destination: "oto",
      },
    });
  }, [ampli]);

  return (
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

      {/* Start Page Content */}
      <div tw="text-center font-medium text-2xl sm:text-5xl md:text-6xl text-csp_neutral-600 mt-[40px] md:mt-[60px] mx-6 leading-[150%]">
        Learn. Take Action.
        <br tw="block sm:hidden" />
        <GradientText> Improve.</GradientText>
      </div>
      <div tw="mx-6">
        <div tw="flex mt-[43px]  md:mt-[76px] justify-center mx-auto items-center">
          <div>
            <Image src={bookImage} alt="Book Image" />
          </div>
          <div tw="w-[579px]">
            <h2 tw="font-bold text-base md:text-2xl leading-[150%] text-csp_neutral-600 mb-2">
              5 Steps to an 800 Score Cheat Sheet
            </h2>
            <p tw="text-base leading-[200%] text-csp_neutral-DarkBG">
              Learn the tips and tricks to obtaining a coveted 800 Credit Score.
              <span tw="hidden sm:block">
                This guide will teach you our 5-step system you can easily
                follow to an excellent credit score.
              </span>
            </p>
            <Link
              href="https://www.thecreditsolutionprogram.com/resources/5_steps_cheatsheet_2022.pdf"
              passHref
            >
              <a download target={"_blank"}>
                <Button
                  color="brand"
                  variant="primary"
                  title="Download The Cheat Sheet"
                  icon={
                    <DownloadIcon tw="hidden sm:block w-[19.58px] h-[22.38px]" />
                  }
                  size="xl"
                  tw="mt-[43px] hidden sm:flex"
                  onClick={onClickDownload}
                />
              </a>
            </Link>
          </div>
        </div>
        <Link
          href="https://www.thecreditsolutionprogram.com/resources/5_steps_cheatsheet_2022.pdf"
          passHref
        >
          <a download target={"_blank"}>
            <Button
              color="brand"
              variant="primary"
              title="Download The Cheat Sheet"
              icon={<DownloadIcon tw="w-[22.38px] h-[22.38px]" />}
              size="xl"
              fullWidth
              tw="mt-[33px] md:mt-[43px] flex sm:hidden"
              onClick={onClickDownload}
            />
          </a>
        </Link>
      </div>

      <SuperChargeSection>
        <div className="background">
          <CheatSheetImage tw="scale-y-100 scale-x-75 -mt-2 sm:mt-0 sm:scale-100" />
        </div>
        <div className="content">
          <h2 tw="text-lg md:text-3xl leading-[150%] font-bold text-csp_neutral-600">
            Want To Supercharge Your Score?
          </h2>
          <p tw="leading-[150%] my-4 text-sm sm:text-base">
            Now that you know the 5 Step system you need to use to raise your
            credit score, go here to get access to the full program + strategies
            + help from our credit experts in our Facebook private group.
          </p>
          <Link
          href="https://www.thecreditsolutionprogram.com/TY-CHEATSHEET-5S"
          passHref
        >
            <Button
              color="white"
              variant="secondary"
              title="Learn More Now"
              tw="mx-auto text-brand-600"
              onClick={onClickLearnMore}
            />
          </Link>
        </div>
      </SuperChargeSection>
      {/* End Page Content */}

      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${tw`max-w-[983px] mx-auto`}
`;

const GradientText = styled.span`
  ${tw`font-extrabold`}
  background: linear-gradient(90deg, #6246EA, #30D1CE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const SuperChargeSection = styled.div`
  ${tw`relative mx-6 mb-20`}

  div.background {
    ${tw`absolute top-[-120px] translate-x-[-50%] left-[50%]`}
    z-index: 0;
  }

  div.content {
    ${tw`relative  md:w-[677px] text-center mx-auto mt-[158px] sm:mt-[230px] mb-[115px] sm:mb-[154px]`}
  }
`;

const StyledHeader = styled.header`
  ${tw`flex items-center justify-between px-6 py-2`}
`;

export default EBookDownloadPage;
