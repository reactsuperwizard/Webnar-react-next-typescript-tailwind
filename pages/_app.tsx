import Script from "next/script";
import { GlobalStyle } from "styles/GlobalStyle";
import { StytchProvider, initStytch } from "@stytch/stytch-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { AmpliContextProvider } from "context";

Sentry.init({
  dsn: "https://4a3b48f6673245f3a8142735330a5d37@o1264950.ingest.sentry.io/6448336",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// Can also use with React Concurrent Mode
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

const stych = initStytch(process.env.NEXT_PUBLIC_STYCH_TOKEN || "");

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src={"https://js.stytch.com/stytch.js"}
        strategy="beforeInteractive"
      />
      <GlobalStyle />
      <StytchProvider stytch={stych}>
        <AmpliContextProvider>
          <Component {...pageProps} />
        </AmpliContextProvider>
      </StytchProvider>
    </>
  );
}

export default MyApp;
