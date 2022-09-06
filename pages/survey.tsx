import { useState, useCallback, ChangeEvent } from "react";
import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";

import { Button, Checkbox, RadioButton } from "../components";

const SurveyPage = () => {
  const router = useRouter();

  const [gender, setGender] = useState("");
  const onChangeGender = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked && setGender(e.target.value);
  }, []);

  const [age, setAge] = useState("");
  const onChangeAge = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked && setAge(e.target.value);
  }, []);

  const [reasons, setReasons] = useState([]);
  const onChangeReason = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setReasons((prev) => [...prev, e.target.value]);
    } else {
      setReasons((prev) => [...prev.filter((item) => item !== e.target.value)]);
    }
  }, []);

  const onClickNext = useCallback(() => {
    window.localStorage.setItem(
      "survey_result",
      JSON.stringify({
        gender,
        age,
        reasons,
      })
    );
    router.push("/checkout");
  }, [gender, age, reasons]);

  return (
    <SurveyPageMainWrapper>
      <SurveyWrapper>
        <div>
          <h3>1. Are you a...</h3>
          <ItemsWrapper>
            <ItemWrapper selected={gender === "Male"}>
              <StyledRadioButton
                size="md"
                group="gender"
                value="Male"
                renderLabel={() => <ItemLabel>Male</ItemLabel>}
                onChange={onChangeGender}
              />
            </ItemWrapper>
            <ItemWrapper selected={gender === "Female"}>
              <StyledRadioButton
                size="md"
                group="gender"
                value="Female"
                renderLabel={() => <ItemLabel>Female</ItemLabel>}
                onChange={onChangeGender}
              />
            </ItemWrapper>
          </ItemsWrapper>
        </div>
        <div>
          <h3>2. What&apos;s your age range?</h3>
          <ItemsWrapper>
            <ItemWrapper selected={age === "20"}>
              <StyledRadioButton
                size="md"
                group="age"
                value="20"
                renderLabel={() => <ItemLabel>20s</ItemLabel>}
                onChange={onChangeAge}
              />
            </ItemWrapper>
            <ItemWrapper selected={age === "30"}>
              <StyledRadioButton
                size="md"
                group="age"
                value="30"
                renderLabel={() => <ItemLabel>30s</ItemLabel>}
                onChange={onChangeAge}
              />
            </ItemWrapper>
            <ItemWrapper selected={age === "40"}>
              <StyledRadioButton
                size="md"
                group="age"
                label="40s"
                value="40"
                renderLabel={() => <ItemLabel>40s</ItemLabel>}
                onChange={onChangeAge}
              />
            </ItemWrapper>
            <ItemWrapper selected={age === "50"}>
              <StyledRadioButton
                size="md"
                group="age"
                value="50"
                renderLabel={() => <ItemLabel>50s</ItemLabel>}
                onChange={onChangeAge}
              />
            </ItemWrapper>
            <ItemWrapper selected={age === "60"}>
              <StyledRadioButton
                size="md"
                group="age"
                value="60"
                renderLabel={() => <ItemLabel>60s</ItemLabel>}
                onChange={onChangeAge}
              />
            </ItemWrapper>
          </ItemsWrapper>
        </div>
        <div>
          <h3>
            3. Why do you want the <i>Credit Solution?</i>
          </h3>
          <ItemsWrapper>
            <ItemWrapper selected={reasons.includes("reason_1")}>
              <StyledCheckBox
                name="reasons"
                variant="squared"
                size="md"
                value="reason_1"
                renderLabel={() => (
                  <ItemLabel>
                    I want to qualify for the best financing on a home, car, or
                    business loan
                  </ItemLabel>
                )}
                onChange={onChangeReason}
              />
            </ItemWrapper>
            <ItemWrapper selected={reasons.includes("reason_2")}>
              <StyledCheckBox
                name="reasons"
                variant="squared"
                size="md"
                value="reason_2"
                renderLabel={() => (
                  <ItemLabel>
                    I want to fulfill the dreams I have for my family and be an
                    excellent provider
                  </ItemLabel>
                )}
                onChange={onChangeReason}
              />
            </ItemWrapper>
            <ItemWrapper selected={reasons.includes("reason_3")}>
              <StyledCheckBox
                name="reasons"
                value="reason_3"
                variant="squared"
                size="md"
                renderLabel={() => (
                  <ItemLabel>
                    I want to finally stop worrying about money and feel more
                    financially secure
                  </ItemLabel>
                )}
                onChange={onChangeReason}
              />
            </ItemWrapper>
          </ItemsWrapper>
        </div>
        <div tw="flex flex-col justify-center">
          <Button
            title="Next Step"
            color="brand"
            variant="primary"
            fullWidth
            onClick={onClickNext}
            tw="text-base leading-[150%] py-[14px]"
          />
          <button
            type="button"
            tw="text-brand mt-4 font-medium text-center text-sm leading-[150%]"
            onClick={onClickNext}
          >
            Skip this step
          </button>
        </div>
      </SurveyWrapper>
    </SurveyPageMainWrapper>
  );
};

const SurveyPageMainWrapper = styled.div`
  ${tw`min-h-screen px-6 pt-20 pb-20`}
  background: radial-gradient(97% 105.49% at 100% -2.94%, #F4E9FC 0%, #E3E6F9 31.92%, #FAFAFE 100%);
`;

const ItemsWrapper = styled.div`
  ${tw`bg-[#FAFAFE] rounded-lg mb-6 overflow-hidden`}
  box-shadow: rgb(255 255 255 / 45%) 0px 0px 0px 3px, rgb(129 126 251 / 25%) 0px 1px 3px, rgb(98 70 234 / 29%) 0px 11px 24px -9px;
`;

const ItemWrapper = styled.div<{
  selected?: boolean;
}>`
  ${tw`transition-all duration-200 ease-in-out border-b border-b-brand-100`}

  @media (hover:hover) {
    &:hover {
      ${tw`bg-brand-100`}
    }
  }

  ${({ selected }) => selected && tw`bg-brand-100`}

  &:last-of-type {
    ${tw`border-none`}
  }
`;

const ItemLabel = styled.span`
  ${tw`ml-[18px] font-medium text-base leading-[150%] text-black`}
`;

const SurveyWrapper = styled.div`
  ${tw`max-w-[500px] mx-auto `}

  h3 {
    ${tw`font-bold text-lg leading-[23.4px] mb-4`}
  }
`;

const StyledRadioButton = styled(RadioButton)`
  ${tw`px-[18px] py-[18px]`}
`;

const StyledCheckBox = styled(Checkbox)`
  ${tw`px-[18px] py-[18px]`}
`;

export default SurveyPage;
