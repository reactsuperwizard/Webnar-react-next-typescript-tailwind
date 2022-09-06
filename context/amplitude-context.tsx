import { createContext, useContext } from "react";
import { ampli, Ampli } from "services";

const AmpliContext = createContext<{
  client: Ampli;
}>({
  client: undefined,
});

type AmpliContextProviderProps = {
  children: React.ReactNode;
};

export const AmpliContextProvider = ({
  children,
}: AmpliContextProviderProps) => {
  if (typeof window !== "undefined") {
    ampli.load({
      environment: process.env.NODE_ENV ?? "development",
      disabled: false,
    });
  }

  return (
    <AmpliContext.Provider
      value={{
        client: ampli,
      }}
    >
      {children}
    </AmpliContext.Provider>
  );
};

export const useAmpli = () => {
  const ampliContext = useContext(AmpliContext);

  if (ampliContext === undefined) {
    throw new Error("useAmpli must be in AmpliContextProvider");
  }

  return ampliContext;
};
