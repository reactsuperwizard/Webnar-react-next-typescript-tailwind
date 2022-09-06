import tw, { styled } from "twin.macro";
import React from "react";
import Link from "next/link";

import LogoSvg from "../../../assets/img/Logo.svg";

export const Header = () => {
  const [toggle, setToggle] = React.useState(null)
  const handleToggleChange = () => {
    if (toggle === null) {
      setToggle(true)
    }
    else {
      setToggle(!toggle)
    }
  }
  return (
    <HeaderWarrper show={toggle}>
      <div tw="max-w-[1088px] m-auto px-[24px] py-4 relative md:flex justify-between">
        <div tw="inline-block py-2 mb-9">
          <Link passHref href="" >
            <a>
              <LogoSvg tw="m-[auto]" />
            </a>
          </Link>
        </div>
        <HeaderMenu show={toggle}>
          <NavMenu show={toggle}>
            <List tw="">
              <Link passHref href="">
                <a tw="py-2 px-3 md:px-1 lg:px-3 hover:bg-[#6246EA] inline-block rounded-[8px] hover:text-white">
                  About Us
                </a>
              </Link>
            </List>
            <List>
              <Link passHref href="">
                <a tw="py-2 px-3 md:px-1 lg:px-3 hover:bg-[#6246EA] inline-block rounded-[8px] hover:text-white">
                  Articles
                </a>
              </Link>
            </List>
            <List>
              <Link passHref href="">
                <a tw="py-2 px-3 md:px-1 lg:px-3 hover:bg-[#6246EA] inline-block rounded-[8px] hover:text-white">
                  Experiences
                </a>
              </Link>
            </List>
            <List>
              <Link passHref href="">
                <a tw="py-2 px-3 md:px-1 lg:px-3 hover:bg-[#6246EA] inline-block rounded-[8px] hover:text-white">
                  Members
                </a>
              </Link>
            </List>
            <List>
              <Link passHref href="">
                <a tw="py-2 px-3 md:px-1 lg:px-3 hover:bg-[#6246EA] inline-block rounded-[8px] hover:text-white">
                  Support
                </a>
              </Link>
            </List>
            <List>
              <Link passHref href="">
                <a tw="py-2 px-3 md:px-1 lg:px-3 hover:bg-[#6246EA] inline-block rounded-[8px] hover:text-white">
                  Order
                </a>
              </Link>
            </List>
            <li tw="text-[14px] font-medium text-[#50497C] pt-2 text-center">
              <Link passHref href="">
                <a tw="pl-[0] md:pl-1 lg:pl-8">
                  1-800-940-0346
                </a>
              </Link>
            </li>
          </NavMenu>
          <Hamhurger onClick={handleToggleChange}>
            <FirstSpan show={toggle}></FirstSpan>
            <SecondSpan show={toggle}></SecondSpan>
            <ThirdSpan show={toggle}></ThirdSpan>
          </Hamhurger>
        </HeaderMenu>
      </div>
    </HeaderWarrper>
  )
}

const HeaderWarrper = styled.header<{
  show: true | false;
}>`
  ${({ show }) => show === true ? tw`bg-white w-[100vw] h-[100vh]` : tw``}
`
const HeaderMenu = styled.div<{
  show: true | false;
}>`
  ${tw`md:flex`}
  ${({ show }) => show === true ? tw`` : tw``}
`;
const NavMenu = styled.ul<{
  show: true | false
}>`
  ${tw`hidden md:flex`}
    ${({ show }) =>
    show === true ? tw`block` : tw`hidden`
  }
`
const List = styled.li`
  ${tw`text-[14px] font-semibold text-[#50497C] mb-2 text-center px-1`}
`;
const Hamhurger = styled.div`
  ${tw`w-[17px] h-[15px] absolute top-[30px] right-[24px] md:hidden`}
`;
const FirstSpan = styled.span<{
  show: true | false;
}>`
  ${tw`w-[100 %] h-[3px] block bg-[#50497C] mb-[3px]`}
  ${({ show }) => show === true ? tw`rotate-45 relative top-[6px]` : tw`rotate-0`}
`
const SecondSpan = styled.span<{
  show: true | false;
}>`
  ${tw`w-[100 %] h-[3px] block bg-[#50497C] mb-[3px]`}
  ${({ show }) => show === true ? tw`hidden` : tw`block`}
`
const ThirdSpan = styled.span<{
  show: true | false;
}>`
  ${tw`w-[100 %] h-[3px] block bg-[#50497C]`}
  ${({ show }) => show === true ? tw`-rotate-45 relative top-[0]` : tw`rotate-0`}
`
