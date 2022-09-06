import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import tw, { styled } from "twin.macro";

import { LockClosedIcon } from "@heroicons/react/solid";

import { Testimonials } from "../../containers/testimonials";
import { CheckoutMembers } from "../../containers/checkout-members";
import { FaqsComponent } from "../../containers/checkout-faq";
import { Checkbox } from "../../components";
import { OrderSummary } from "../../containers/order-summary";
import { TrustyFeedback } from "../../containers/trusty-feedback";
import { AccountDetailForm } from "../../containers/account-detail-form";
import { AddressDetailForm } from "../../containers/address-detail-form";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useAmpli } from "../../context";

import LogoImg from "../../assets/img/Logo.svg";
import CreditBadge from "../../assets/icons/credit-badge.svg";
import aPlusImage from "../../assets/img/a-plus-rating.png";
import trustedSiteImage from "../../assets/img/trusted-site.png";
import moneyBackImage from "../../assets/img/money-back.png";
import { fetchContent } from "../../graphql/contentful";
import { GET_TESTIMONIALS, GET_FAQS } from "../../graphql/queries";
import { PaymentForm } from "containers/payment-form";

type STEP = "account" | "account_detail" | "address_detail" | "payment";

const transitionProps = {
  enter: "transition duration-100 ease-out",
  enterFrom: "transform scale-95 opacity-0",
  enterTo: "transform scale-100 opacity-100",
  leave: "transition duration-75 ease-out",
  leaveFrom: "transform scale-100 opacity-100",
  leaveTo: "transform scale-95 opacity-0",
};

const CheckoutPage = (props: any) => {
  const ampli = useAmpli();
  const router = useRouter();
  const [opened, setOpened] = useState<STEP>("account_detail");
  const visited = useRef([]);

  const isMobile = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const surveyResult = window.localStorage.getItem("survey_result");
    if (!surveyResult) {
      router.push("/survey");
    }
  }, []);

  useEffect(() => {
    visited.current.push(opened);
  }, [opened]);

  const handleSaveAccountDetail = useCallback((data: any) => {
    setOpened("address_detail");

    ampli.client.track({
      event_type: "submit form",
      event_properties: {
        form_type: "checkout account details",
        validated: true,
      },
    });
  }, []);

  const handleSaveAddressDetail = useCallback((data: any) => {
    ampli.client.track({
      event_type: "submit form",
      event_properties: {
        form_type: "checkout address details",
        validated: true,
      },
    });
  }, []);

  const handleSavePayment = useCallback(
    (data: any) => {
      ampli.client.track({
        event_type: "submit form",
        event_properties: {
          form_type: "checkout payment details",
          validated: true,
        },
      });
    },
    [ampli]
  );

  return (
    <>
      <CheckoutPageWrapper>
        <div tw="max-w-5xl mx-auto flex items-center justify-between py-8 px-6 lg:px-0">
          <LogoImg />
          <div tw="flex items-center">
            <LockClosedIcon color="#50497C" tw="w-5 h-5" />
            <span tw="ml-2 text-[#50497C] font-semibold text-xs leading-[150%] uppercase">
              Secure Checkout
            </span>
          </div>
          <div tw="justify-end hidden md:flex items-center gap-x-2 py-4">
            <Image src={aPlusImage} alt="A Plus Rating" />
            <div
              className="trustedsite-trustmark"
              data-type="202"
              data-width="120"
              data-height="50"
            >
              <Image
                src={trustedSiteImage}
                alt="A Plus Rating"
                tw="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div tw="max-w-5xl mx-auto flex justify-between flex-col lg:flex-row gap-x-[17.5px] px-6 lg:px-0">
          <div tw="w-full lg:max-w-[600px]">
            <div tw="flex items-start">
              <Checkbox variant="squared" name="boost_credit" defaultChecked />
              <p tw="ml-2 font-medium text-sm leading-normal text-csp_neutral-DarkBG mt-[-4px]">
                Yes, I am ready to{" "}
                <strong>
                  boost my credit score up to 136 points in as little as 30 days
                </strong>
                . I realize today&apos;s special price of just $97 &amp;27 may
                not last. If in the next 90 days I am not thrilled with my
                results, I can get a full and fast refund...
              </p>
            </div>
            <div tw="flex items-center justify-center py-6">
              <CreditBadge />
              <div tw="ml-2.5">
                <h2 tw="text-csp_neutral-DarkBG font-bold text-xl leading-[30px]">
                  Satisfaction Guaranteed
                </h2>
                <p tw="italic font-semibold text-xs leading-[18px] text-csp_neutral-contrast ">
                  Not for sale on Amazon or any other website
                </p>
              </div>
            </div>
            <div>
              <StyledDisclosureWrapper
                css={[opened === "account_detail" ? tw`p-6` : tw`p-4`]}
              >
                <div
                  tw="w-full flex justify-between items-center cursor-pointer"
                  onClick={() => setOpened("account_detail")}
                >
                  <div>
                    <div
                      tw="text-left font-bold text-lg leading-[23.4px]"
                      css={[
                        opened === "account_detail"
                          ? tw`text-csp_neutral-DarkBG`
                          : tw`text-csp_neutral-contrast1`,
                      ]}
                    >
                      Account Details
                    </div>
                    {opened === "account_detail" && (
                      <p tw="font-medium text-xs leading-[150%] text-csp_neutral-contrast1 text-left py-2">
                        These details will be used to create your account
                      </p>
                    )}
                  </div>

                  {opened !== "account_detail" &&
                    visited.current.includes("account_detail") && (
                      <EditButton>Edit</EditButton>
                    )}
                </div>
                <Transition
                  show={opened === "account_detail"}
                  {...transitionProps}
                >
                  <AccountDetailForm onSave={handleSaveAccountDetail} />
                </Transition>
              </StyledDisclosureWrapper>

              <StyledDisclosureWrapper
                css={[opened === "address_detail" ? tw`p-6` : tw`p-4`]}
              >
                <div
                  tw="w-full flex justify-between items-center cursor-pointer"
                  onClick={() => setOpened("address_detail")}
                >
                  <>
                    <div>
                      <div
                        tw="text-left font-bold text-lg leading-[23.4px]"
                        css={[
                          opened === "address_detail"
                            ? tw`text-csp_neutral-DarkBG`
                            : tw`text-csp_neutral-contrast1`,
                        ]}
                      >
                        Address Details
                      </div>
                      {opened === "address_detail" && (
                        <p tw="font-medium text-xs leading-[150%] text-csp_neutral-contrast1 text-left py-2">
                          Add your address details below
                        </p>
                      )}
                    </div>

                    {opened !== "address_detail" &&
                      visited.current.includes("address_detail") && (
                        <EditButton>Edit</EditButton>
                      )}
                  </>
                </div>
                <Transition
                  show={opened === "address_detail"}
                  {...transitionProps}
                >
                  <AddressDetailForm onSave={handleSaveAddressDetail} />
                </Transition>
              </StyledDisclosureWrapper>

              <StyledDisclosureWrapper
                css={[opened === "payment" ? tw`p-6` : tw`p-4`]}
              >
                <div
                  tw="w-full flex justify-between items-center cursor-pointer"
                  onClick={() => setOpened("payment")}
                >
                  <div>
                    <div
                      tw="text-left font-bold text-lg leading-[23.4px]"
                      css={[
                        opened === "payment"
                          ? tw`text-csp_neutral-DarkBG`
                          : tw`text-csp_neutral-contrast1`,
                      ]}
                    >
                      Payment
                    </div>
                    {opened === "payment" && (
                      <p tw="font-medium text-xs leading-[150%] text-csp_neutral-contrast1 text-left py-2">
                        All transactions are secure and encrypted
                      </p>
                    )}
                  </div>

                  {opened !== "payment" &&
                    visited.current.includes("payment") && (
                      <EditButton>Edit</EditButton>
                    )}
                </div>
                <Transition show={opened === "payment"} {...transitionProps}>
                  <PaymentForm onSave={handleSavePayment} />
                </Transition>
              </StyledDisclosureWrapper>
            </div>
          </div>
          <div>
            <OrderSummary
              course={{
                title: "The Credit Solution Program",
                description: "Includes the 800 Club Monthly Membership",
                price: 27,
                id: "course_27",
                status: "not_started",
              }}
              bonuses={[
                {
                  id: "bonus_1",
                  title: "100% Proven “Done-for-You” Letter Kit",
                  price: 14,
                },
                {
                  id: "bonus_2",
                  title: "100% Secret Guaranteed Approval $5,000 Credit Lines",
                  price: 14,
                },
                {
                  id: "bonus_2",
                  title: "How to Get Credit Lines up to $50,000+",
                  price: 14,
                },
                {
                  id: "bonus_3",
                  title: "10 Ways to Make an Extra $1,000 per Month",
                  price: 14,
                },
                {
                  id: "bonus_4",
                  title: "Building Business Credit",
                  price: 14,
                },
              ]}
              collapsable={!isMobile}
            />
          </div>
        </div>
        <div tw="max-w-5xl mx-auto">
          <TrustyFeedback
            feedbacks={[
              {
                id: "feedback_1",
                title: "100% Protected",
                description:
                  "When you place your order it will be protected by 256-bit encrypted SSL - the same technology that Amazon uses to protect online transactions!",
                img: trustedSiteImage,
              },
              {
                id: "feedback_2",
                title: "100% Risk Free",
                description:
                  "If in the next 90 days your  score hasn't improved - or if you aren't satisfied for any reason - just return your purchase for a full refund.",
                img: moneyBackImage,
              },
              {
                id: "feedback_3",
                title: "100% Protected",
                description:
                  "You get 3 EXTRA layers of purchase protection from TrustedSite, the world's leading site security authority",
                img: trustedSiteImage,
              },
            ]}
          />
        </div>
        <CheckoutMembers numberOfMembers="71,321" />
        <Testimonials testimonials={props.testimonials} />
        <FaqsComponent faqs={props.faqs} />
        <Address>
          1990 North California Blvd, Suite 830, Walnut Creek, CA 94596 USA -
          1-800-940-0346
        </Address>
      </CheckoutPageWrapper>
      <Script src="https://cdn.ywxi.net/js/1.js" async></Script>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const contents = await fetchContent(GET_TESTIMONIALS);

    const faqResult = await fetchContent(GET_FAQS);

    return {
      props: {
        testimonials: contents?.testimonialCollection?.items ?? [],
        faqs: faqResult?.faqCollection?.items ?? [],
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

const StyledDisclosureWrapper = styled.div`
  ${tw`bg-[#FAFAFE] rounded-lg mb-4`}
  box-shadow: rgb(255 255 255 / 45%) 0px 0px 0px 3px, rgb(129 126 251 / 25%) 0px 1px 3px, rgb(98 70 234 / 29%) 0px 11px 24px -9px;
`;

const CheckoutPageWrapper = styled.main`
  ${tw`min-h-screen`}
  background: radial-gradient(
    97% 105.49% at 100% -2.94%,
    #f4e9fc 0%,
    #e3e6f9 31.92%,
    #fafafe 100%
  );
`;

const Address = styled.div`
  ${tw`text-csp_neutral-contrast1 font-medium text-sm leading-[150%] py-[73px] text-center`}
`;

const EditButton = styled.button`
  ${tw`px-3 py-2 text-xs transition duration-300 ease-linear rounded-md text-brand hover:bg-brand-800 hover:text-csp_neutral-contrast1`}
`;

export default CheckoutPage;
