import tw, { styled } from "twin.macro";
import React from "react";
import Link from "next/link";

import LogoSvg from "../../../assets/img/Logo.svg";

export const Footer = () => {

  return (
    <footer tw="bg-[#2C2836] pt-6 pb-[20px] mt-2">
      <div tw="max-w-[1088px] m-auto px-[24px]">
        <FooterMenu>
          <div tw="flex justify-between md:w-[64%]">
            <CreditSolution >
              <h1 tw="text-[16px] leading-[24px] font-bold text-[#EEF0FF] mb-6">The Credit Solution Program</h1>
              <List tw="">
                <Link passHref href="">
                  <a tw="py-2">
                    About Us
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Order Now
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Experiences
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Careers
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Articles
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Free Lessons
                  </a>
                </Link>
              </List>
            </CreditSolution>
            <Support>
              <h1 tw="text-[16px] leading-[24px] font-bold text-[#EEF0FF] mb-6">Support</h1>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Members Login
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Customer Support
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Credit Solution FAQ
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Contact Us
                  </a>
                </Link>
              </List>
              <List>
                <Link passHref href="">
                  <a tw="py-2">
                    Returns
                  </a>
                </Link>
              </List>
            </Support>
          </div>
          <ContactUs>
            <div tw="hidden">
              <h1>Contact Us</h1>
              <p>support@thecreditsolutionprogram.com</p>
            </div>
            <div tw="text-center">
              <p tw="text-[14px] font-medium leading-[21px] text-white">Smart Consumer Solutions LLC</p>
              <p tw="text-[14px] font-medium leading-[21px] text-white">1990 North California Blvd, Suite 830</p>
              <p tw="text-[14px] font-medium leading-[21px] text-white">Walnut Creek, CA 94596</p>
              <p tw="text-[14px] font-medium leading-[21px] text-white">United States</p>
            </div>
          </ContactUs>
        </FooterMenu>
        <Disclaimer>
          <BlodTitle>*Disclaimer:</BlodTitle> Content provided on the Credit Solution Program is for informational purposes only and should not be considered legal advice. In a 2015 study using past Credit Solution customers that followed our full program, the average result was 116 points improved in 7.5 months. However, there is no guarantee you will see the average result or any result. Results may vary based on credit history and motivation to follow our program. <BoldText>Full disclaimer here.</BoldText>
        </Disclaimer>
        <FooterBottom>
          <Link passHref href="" >
            <a>
              <LogoSvg tw="m-[auto]" />
            </a>
          </Link>
          <div tw="mt-[30px] md: mt-[0] ">
            <p tw=" px-[20px] text-center text-[14px] font-normal text-[#BCBCCD] leading-[21px] mb-[30px] md:mb-[0]">All Rights Reserved.The Credit Solution Program.</p>
            <p tw="text-center text-[14px] font-normal text-[#BCBCCD] leading-[21px] md:mb-[0]  ">
              Disclaimer | Privacy Policy | Terms of Use | Disclosure</p>
          </div>
        </FooterBottom>
      </div >
    </footer >
  )
}

const FooterMenu = styled.div`
  ${tw`md:flex justify-between`}
`;
const CreditSolution = styled.ul`
  ${tw`w-[46.2%]`}
`;
const List = styled.li`
  ${tw`text-[14px] font-medium text-[#ffffff] pb-2`}
`
const Support = styled.ul`
  ${tw`w-[46.2%]`}
`;
const ContactUs = styled.div`
  ${tw`mt-4 pt-4 mb-2 md:pt-[0]`}
`;
const Disclaimer = styled.p`
  ${tw`my-[21px] text-[14px] leading-[21px] text-center text-[#BCBCCD] md:text-left md:font-normal md:leading-[150%] md: text-[16px] md: pr-[20px]`}
`;
const BlodTitle = styled.span`
  ${tw`font-semibold `}
`;
const BoldText = styled.span`
  ${tw`font-bold text-[#817EFB] block md:inline-block`}
`;
const FooterBottom = styled.div`
  ${tw`mt-2 text-center md:flex justify-between items-center md:pt-[26px]`}
`;
