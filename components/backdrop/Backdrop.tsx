import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";

type BackdropProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export const Backdrop = ({ onClick, children, ...rest }: BackdropProps) => {
  return (
    <BackdropWrapper
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </BackdropWrapper>
  );
};

const BackdropWrapper = styled(motion.div)`
  ${tw`fixed top-0 z-50 w-full min-h-screen bg-black bg-opacity-75`}
`;
