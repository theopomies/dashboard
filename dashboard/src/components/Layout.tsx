import { Center, Grid, GridItem } from "@chakra-ui/layout";
import { ReactNode } from "react";
import { DateDisplayer } from "../components/Date";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Navbar } from "./Navbar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <DarkModeSwitch />
      <Grid
        minHeight="100vh"
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
        <GridItem colSpan={14} rowSpan={17}>
          {children}
        </GridItem>
      </Grid>
    </main>
  );
}
