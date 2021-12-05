import { useColorMode } from "@chakra-ui/color-mode";
import { Center, Grid, GridItem } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { DateDisplayer } from "../components/Date";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode == "dark") toggleColorMode();

  return (
    <main>
      <Grid
        h="100vh"
        w="100%"
        bg="brand.lightGray"
        templateColumns="repeat(15, 1fr)"
        templateRows="repeat(20, 1fr)"
      >
        <GridItem
          colSpan={1}
          rowSpan={20}
          bg="white"
          border="2px solid"
          borderColor="brand.borderGray"
          padding="1rem"
        >
          <Navbar />
        </GridItem>
        <GridItem colSpan={14} rowSpan={3} padding="2rem 4rem">
          <Center>
            <DateDisplayer />
          </Center>
        </GridItem>
        <GridItem colSpan={14} rowSpan={16} h="100%" w="100%" overflow="scroll">
          {children}
        </GridItem>
      </Grid>
    </main>
  );
}
