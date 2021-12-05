import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    brand: {
      lightGray: "#f7f8fa",
      borderGray: "#edf0f7",
      gray: "#b0b3bd",
      darkGray: "#474862",
      lightBlue: "#39B4F3",
      blue: "#2012FE",
      darkblue: "#625ED7",
      twitter: "#1da1f2",
      lightTwitter: "#1da0f21d",
      error: "#ff5b5b",
      spotify: "#1ED760",
      lightSpotify: "#1ed75f9b",
      solana: "#9945FF",
      lightSolana: "#9945ff9d",
    },
  },
  fonts,
  breakpoints,
  useSystemColorMode: false,
  initialColorMode: "light",
});

export default theme;
