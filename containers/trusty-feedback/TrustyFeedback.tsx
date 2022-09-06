import Image from "next/image";

import { TrustyFeedback as TrustyFeedbackItem } from "../../types";

type TrustyFeedbackProps = {
  feedbacks: TrustyFeedbackItem[];
};

export const TrustyFeedback = ({ feedbacks }: TrustyFeedbackProps) => {
  return (
    <div tw="flex flex-col gap-y-10 md:flex-row  md:gap-x-10 py-11 px-6 md:px-0">
      {feedbacks.map((_feedbackItem) => (
        <div key={_feedbackItem.id} tw="flex flex-col items-center justify-end">
          <Image src={_feedbackItem.img} />
          <div tw="font-bold text-[20px] leading-[150%] mt-6 mb-4">
            {_feedbackItem.title}
          </div>
          <div tw="font-medium text-xs leading-[150%] text-csp_neutral-contrast text-center">
            {_feedbackItem.description}
          </div>
        </div>
      ))}
    </div>
  );
};
