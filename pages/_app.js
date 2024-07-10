import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
    </AnimatePresence>
  );
}

export default MyApp;
