import "@/styles/globals.css";
import { GlobalContextProvider } from "../context/context";
import Navbar from "./components/Navbar";
import { Box, ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <ChakraProvider>
        <Box className="main-wrapper">
          <Navbar />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </GlobalContextProvider>
  );
}
