import tw, { styled } from "twin.macro";
import Link from "next/link";

import LogoSvg from "../../../assets/img/Logo.svg";

export const Footer = (props) => {
  return (
    <FooterWrapper {...props}>
      <Link passHref href="">
        <a tw="py-6">
          <LogoSvg />
        </a>
      </Link>
      <div tw="flex justify-end flex-col items-center sm:items-end">
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
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  ${tw`w-full flex items-center justify-between py-[21px] px-6 max-w-5xl mx-auto flex-col sm:flex-row`}

  p {
    ${tw`text-xs  sm:text-sm leading-[150%] text-csp_neutral-contrast1`}
  }
  nav {
    ul {
      ${tw`flex items-center`}
      li {
        ${tw`flex items-center justify-center px-2 border-r border-r-csp_neutral-contrast1`}

        a {
          ${tw`text-xs sm:text-sm leading-[150%] text-csp_neutral-contrast1 whitespace-nowrap  `}
        }

        &:last-of-type {
          ${tw`pr-0 border-none`}
        }
      }
    }
  }
`;
