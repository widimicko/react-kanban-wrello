import * as React from "react";
import {
  ChakraProvider,
  Box,
  theme,
  CSSReset,
  Heading,
} from "@chakra-ui/react";
import backgroundImage from "./assets/images/app-root-background.jpg";

export const App = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundPosition="50%"
      backgroundSize="cover"
      height="100vh"
      position="relative"
    >
      <Heading as="h1" color={"white"}>
        Hello React & Chakra UI
      </Heading>
    </Box>
  </ChakraProvider>
);
