import tw, { styled } from "twin.macro";

export const CardContent = ({ title }) => {
  return (
    <CardContentWrapper>
      <Title>{title}</Title>
      <SvgContainer viewBox="0 0 142 169" preserveAspectRatio="xMinYMin meet">
        <defs>
          <clipPath id="svgPath">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M7.46961 0C3.34426 0 0 3.34426 0 7.46962V161.53C0 165.656 3.34426 169 7.46962 169H37.3481C41.4734 169 44.7133 165.592 45.835 161.622C49.0473 150.253 59.4983 141.923 71.895 141.923C84.2918 141.923 94.7428 150.253 97.955 161.622C99.0767 165.592 102.317 169 106.442 169H135.387C139.512 169 142.856 165.656 142.856 161.53V7.46961C142.856 3.34426 139.512 0 135.387 0H7.46961Z"
            />
          </clipPath>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="white"
          clipPath="url(#svgPath)"
        />
      </SvgContainer>
    </CardContentWrapper>
  );
};

const CardContentWrapper = styled.div`
  ${tw`absolute top-[47px] left-[0] w-[143px] h-[170px]`}
  box-shadow: 0px 0.933702px 2.80111px rgba(129, 126, 251, 0.13), 0px 8.40332px 19.6077px rgba(98, 70, 234, 0.07);
  border-radius: 7.46961px;
`;
const SvgContainer = styled.svg`
  filter: drop-shadow(
    0px 0.933702px 2.80111px rgba(129, 126, 251, 0.13),
    0px 8.40332px 19.6077px rgba(98, 70, 234, 0.07)
  );
  box-shadow: 0px 0.933702px 2.80111px rgba(129, 126, 251, 0.13), 0px 8.40332px 19.6077px rgba(98, 70, 234, 0.25);
   border-radius: 7.46961px;
  border: 2.80111px solid rgba(255, 255, 255, 0.45);
`;

const Title = styled.h2`
  position: absolute;
  color: #6246ea;
  bottom: 54px;
  left: 50%;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  width: 100%;
  transform: translate(-50%, 0);
`;
