import Link from "next/link";
import { ChangeEvent, useCallback, useState, useEffect } from "react";
import tw, { styled } from "twin.macro";
import Image from "next/image";
import { DownloadIcon } from "@heroicons/react/solid";
import { AnimatePresence } from "framer-motion";
import { GetStaticProps } from "next";

import { AdVideo } from "../containers/ad-video";
import { Footer } from "../containers/layout/footer";
import { Button } from "../components";
import { OfferModal } from "../containers/offer-modal";
import { Backdrop } from "../components/backdrop";
import { useAmpli } from "../context";

import aPlusImage from "../assets/img/a-plus-rating.png";
import WarningIcon from "../assets/icons/warning.svg";
import SmallWarningIcon from "../assets/icons/warning-sm.svg";
import trustedSiteImage from "../assets/img/trusted-site.png";
import moneyBackImage from "../assets/img/money-back.png";

import { fetchContent } from "../graphql/contentful";
import { GET_SURVEYS } from "../graphql/queries";

import { Survey } from "../types";

const OfferPage = (props: any) => {
  const ampli = useAmpli();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Array<Survey>>([]);

  useEffect(() => {
    setSteps(() => {
      return props.data;
    });
  }, [props.data]);

  const [result, setResult] =
    useState<{
      [step: number]: string;
    }>();

  const onCheckHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      ampli.client.track({
        event_type: "submit survey answer",
        event_properties: {
          survey_id: props.survey_id ?? undefined,
          question_id: steps[currentStep - 1]?.sys?.id,
          question: steps[currentStep - 1]?.question,
          survey_step: currentStep,
          answers: steps[currentStep - 1]?.answer,
          question_type: steps[currentStep - 1]?.questionType,
          answer_selected: e.target.value,
        },
      });

      if (e.target.value === "no") {
        setCurrentStep(0);

        ampli.client.track({
          event_type: "close modal",
          event_properties: {
            modal_type: "oto_survey",
          },
        });

        ampli.client.track({
          event_type: "end survey",
          event_properties: {
            survey_type: "OTO Pre-Qualification 2022",
            survey_entry_id: props.survey_id,
            completed: 0,
          },
        });
      } else {
        setResult((prev) =>
          prev
            ? { ...prev, [currentStep]: e.target.value }
            : { [currentStep]: e.target.value }
        );

        if (currentStep === steps.length) {
          ampli.client.track({
            event_type: "end survey",
            event_properties: {
              survey_type: "OTO Pre-Qualification 2022",
              survey_entry_id: props.survey_id,
              completed: 1,
            },
          });
        }

        setCurrentStep(currentStep < steps.length + 1 ? currentStep + 1 : 0);
      }
    },
    [currentStep, ampli, steps]
  );

  const onCloseModal = () => {
    setCurrentStep(0);

    ampli.client.track({
      event_type: "close modal",
      event_properties: {
        modal_type: "oto_survey",
      },
    });

    if (currentStep < steps.length) {
      ampli.client.track({
        event_type: "end survey",
        event_properties: {
          survey_type: "OTO Pre-Qualification 2022",
          survey_entry_id: props.survey_id,
          completed: 0,
        },
      });
    }
  };

  const onClickStartSurvey = useCallback(() => {
    setCurrentStep(1);

    ampli.client.track({
      event_type: "press button",
      event_properties: {
        button_type: "CTA",
        button_action: "load modal",
        button_goal: "complete survey",
        button_location: "one_time_offer_page",
      },
    });

    ampli.client.track({
      event_type: "start survey",
      event_properties: {
        survey_type: "OTO Pre-Qualification 2022",
        survey_entry_id: props.survey_id,
        survey_steps: steps.length,
      },
    });

    ampli.client.track({
      event_type: "open modal",
      event_properties: {
        modal_type: "oto_survey",
      },
    });
  }, [props.survey_id, ampli, steps]);

  return (
    <PageBack>
      <div tw="py-4 text-white bg-csp_neutral-DarkBG">
        <div tw="mx-auto px-6 md:px-0 md:max-w-5xl font-semibold text-xs sm:text-sm md:text-base leading-[150%] text-center">
          <span tw="text-denotive-error font-extrabold">IMPORTANT:</span> Do NOT
          Close This Window or Click the “Back Button. Clicking the back button
          can result in your cheat sheet not being delivered.
        </div>
      </div>
      <PageWrapper>
        <div tw="flex items-center flex-col justify-center sm:flex-row px-6 my-4">
          <div tw="flex items-center mb-4 sm:mb-0">
            <WarningIcon tw="hidden sm:block" />
            <SmallWarningIcon tw="block sm:hidden" />
            <span tw="text-denotive-error text-[17.42px] leading-[26.13px] ml-[3.87px] sm:text-4xl sm:leading-[150%] font-extrabold">
              WAIT!
            </span>
          </div>
          <div tw="ml-0 sm:ml-14 text-center">
            <div tw="text-denotive-error  font-bold text-lg leading-[23.4px] sm:text-base sm:leading-[150%]">
              Your Email Subscription Is Not Complete Yet...
            </div>
            <div tw="text-csp_neutral-contrast font-bold sm:font-medium text-xs leading-[150%] sm:text-base mt-4 sm:mt-0">
              Please Watch This Important Video Below Now!
            </div>
          </div>
        </div>
        <div tw="px-6">
          <AdVideo pause={currentStep !== 0} videoId="2avfhf4on4" />
        </div>

        <div tw="py-5">
          <div tw="text-center text-base sm:text-xl leading-[150%] text-csp_neutral-contrast font-bold py-2 px-6">
            Claim Your Discount + 6 FREE Bonuses
          </div>
          <div tw="mx-6">
            <Button
              color="brand"
              variant="primary"
              title="Improve Your Credit Now"
              icon={
                <DownloadIcon tw="hidden sm:block w-[27.97px] h-[27.97px]" />
              }
              onClick={onClickStartSurvey}
              fullWidth
              size="xl"
              tw="text-[19.58px] leading-[29.37px] py-[14px] sm:py-[20px] font-medium md:text-[22.8px] md:leading-[33.57px] md:py-[18.5px]"
            />
          </div>
          <div tw="flex items-center justify-center gap-x-6 py-4 my-2 px-6">
            <div>
              <Image src={moneyBackImage} alt="Money back" />
            </div>
            <div>
              <Link
                href="http://www.bbb.org/greater-san-francisco/business-reviews/publishers-book/smart-consumer-solutions-llc-in-san-francisco-ca-382309/#bbbonlineclick"
                passHref
              >
                <a target="_blank">
                  <Image src={aPlusImage} alt="A Plus" />
                </a>
              </Link>
            </div>
            <div>
              <Image src={trustedSiteImage} alt="Money back" />
            </div>
          </div>
        </div>
      </PageWrapper>
      <Footer />
      <AnimatePresence>
        {currentStep !== 0 && (
          <Backdrop tw="flex items-center justify-center">
            <OfferModal
              type="case"
              currentStep={currentStep}
              from="bottom"
              to={currentStep === 1 ? "bottom" : "left"}
              show={currentStep === 1}
              steps={steps}
              onCloseModal={onCloseModal}
              onCheck={onCheckHandler}
            />

            <OfferModal
              type="case"
              currentStep={currentStep}
              to={currentStep === 1 ? "right" : "left"}
              show={currentStep === 2}
              steps={steps}
              onCloseModal={onCloseModal}
              onCheck={onCheckHandler}
            />

            <OfferModal
              type="case"
              currentStep={currentStep}
              from="right"
              to={currentStep === 3 ? "left" : "right"}
              steps={steps}
              show={currentStep === 3}
              onCloseModal={onCloseModal}
              onCheck={onCheckHandler}
            />

            <OfferModal
              type="case"
              currentStep={currentStep}
              from="right"
              to={currentStep === 4 ? "left" : "right"}
              steps={steps}
              show={currentStep === 4}
            />
          </Backdrop>
        )}
      </AnimatePresence>
    </PageBack>
  );
};

type Question = {
  question: string;
  description: string;
  answer: Array<string>;
  questionType: Array<any>;
};

type Suvery = {
  id: string;
  name: string;
  questions: Array<Question>;
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const contents = await fetchContent(GET_SURVEYS);

    const items = contents?.surveyQuestionsCollection?.items.filter(
      (_item: any) => _item?.survey?.name === "OTO Pre-Qualification 2022"
    );

    return {
      props: {
        data: items ?? null,
        survey_id: items?.[0]?.survey?.sys.id,
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

const PageWrapper = styled.div`
  ${tw`max-w-[700px] mx-auto min-h-[100vh]`}
`;

const PageBack = styled.div`
  background: radial-gradient(
    97% 105.49% at 100% -2.94%,
    #f4e9fc 0%,
    #e3e6f9 31.92%,
    #fafafe 68.12%
  );

  box-shadow: 0px 1px 3px rgba(129, 126, 251, 0.13),
    0px 9px 21px -16px rgba(98, 70, 234, 0.07);
  border-radius: 8px;
`;

export default OfferPage;
