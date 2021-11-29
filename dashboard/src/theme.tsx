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
    },
  },
  fonts,
  breakpoints,
});

export default theme;
