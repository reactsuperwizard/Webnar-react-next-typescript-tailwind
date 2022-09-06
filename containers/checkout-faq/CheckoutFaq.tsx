import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import tw, { styled } from "twin.macro";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { FAQ } from "../../types";

type FaqsComponentProps = {
  faqs: FAQ[];
};

export const FaqsComponent = ({ faqs }: FaqsComponentProps) => {
  return (
    <div tw="max-w-3xl mx-auto mb-[141px] px-6">
      <h4 tw="text-3xl leading-[150%] text-csp_neutral-DarkBG  py-8 font-bold text-center">
        Frequently Asked Questions
      </h4>
      <div>
        {faqs.map((_faqItem) => (
          <Disclosure key={_faqItem?.sys?.id}>
            {({ open }) => (
              <StyledDisclosureWrapper tw="py-5 px-4">
                <Disclosure.Button tw="w-full flex justify-between items-center">
                  {({ open }) => (
                    <>
                      <div tw="text-left font-bold text-sm md:text-base lg:text-lg leading-[23.4px] text-csp_neutral-DarkBG">
                        {_faqItem.title}
                      </div>

                      <button
                        type="button"
                        tw="text-brand text-xs bg-brand-100 transition-all duration-300 ease-in-out rounded-full"
                        css={[open && tw`rotate-90`]}
                      >
                        <ChevronRightIcon tw="w-5 h-5" />
                      </button>
                    </>
                  )}
                </Disclosure.Button>
                <Disclosure.Panel tw="flex pt-4 items-end justify-between">
                  <FaqDetail>
                    {documentToReactComponents(_faqItem.description.json)}
                  </FaqDetail>
                </Disclosure.Panel>
              </StyledDisclosureWrapper>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

const StyledDisclosureWrapper = styled.div`
  ${tw`bg-[#FAFAFE] rounded-lg mb-4`}
  box-shadow: rgb(255 255 255 / 45%) 0px 0px 0px 3px,
    rgb(129 126 251 / 25%) 0px 1px 3px, rgb(98 70 234 / 29%) 0px 11px 24px -9px;
`;

const FaqDetail = styled.div`
  p {
    ${tw`text-csp_neutral-contrast text-sm leading-[150%] mb-2`}
  }
`;
