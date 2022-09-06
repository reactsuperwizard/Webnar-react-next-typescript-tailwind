import tw, { styled } from "twin.macro";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import notFoundLottie from "../assets/lottie/404-error.json";
import { Button } from "components";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import useMediaQuery from "hooks/useMediaQuery";

export default function FourOhFour() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div tw="py-6">
      <div tw="flex justify-center items-center">
        <img src="/img/Logo.svg" tw="w-[200px]" />
      </div>
      <div tw="my-6">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: notFoundLottie,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={isMobile ? "375px" : "640px"}
          width={isMobile ? "375px" : "640px"}
        />
      </div>
      <div tw="flex flex-col items-center">
        <GradientText tw="text-6xl mb-3">Oops!</GradientText>
        <p tw="text-center">We can&lsquo;t find the page your&lsquo;re looking for.</p>
        <div tw="mt-[41px]">
          <StyledButton
            variant="primary"
            color="brand"
            iconPos="left"
            icon={<ArrowCircleLeftIcon tw="w-4 h-4" />}
            onClick={() => router.push("/")}
            title="Back To Home"
          />
        </div>
      </div>
    </div>
  );
}

const GradientText = styled.span`
  ${tw`font-extrabold`}
  background: linear-gradient(90deg, #6246EA, #30D1CE);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const StyledButton = styled(Button)`
  box-shadow: 0px 9px 19px #c5caff;
`;
