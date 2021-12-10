import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/layout";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import React, { ReactNode } from "react";
import { DateDisplayer } from "../components/Date";
import {
  disableService,
  disconnectUser,
  enableService,
  Service,
  useServices,
} from "../hooks/useServices";
import { GithubLogin } from "./GithubLogin";
import { Navbar } from "./Navbar";
import { SolanaLogin } from "./SolanaLogin";
import { SpotifyLogin } from "./SpotifyLogin";

const logins: { [K in Service]: React.FC } = {
  solana: SolanaLogin,
  github: GithubLogin,
  spotify: SpotifyLogin,
};

export function Layout({ children }: { children: ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode == "dark") toggleColorMode();
  const [services, setServices] = useServices();

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
        <GridItem
          colSpan={14}
          rowSpan={3}
          padding="2rem 4rem"
          position="relative"
        >
          <Center position="absolute" w="100%">
            <DateDisplayer />
          </Center>
          <Flex justify="end">
            <Popover>
              <PopoverTrigger>
                <IconButton
                  aria-label="settings"
                  padding={0}
                  bg="none"
                  margin={0}
                  height="max-content"
                  icon={<SettingsIcon fontSize="1.5rem" />}
                  color="brand.gray"
                  _hover={{ bg: "none", color: "brand.darkGray" }}
                />
              </PopoverTrigger>
              <PopoverContent
                borderColor="transparent"
                shadow="lg"
                marginRight="1rem"
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  {Object.entries(logins).map(([service, Login]) => (
                    <Box key={service}>
                      <Heading size="sm" marginTop="1rem">
                        {service[0].toUpperCase() + service.slice(1)}
                      </Heading>
                      <Divider />
                      <ButtonGroup margin="1rem">
                        {services[service] == null ? (
                          <Login />
                        ) : (
                          <>
                            {services.actives[service] ? (
                              <Button
                                onClick={() =>
                                  disableService({
                                    service: service as Service,
                                    setServices,
                                    services,
                                  })
                                }
                              >
                                Disable
                              </Button>
                            ) : (
                              <Button
                                onClick={() =>
                                  enableService({
                                    service: service as Service,
                                    setServices,
                                    services,
                                  })
                                }
                                colorScheme="green"
                              >
                                Enable
                              </Button>
                            )}
                            <Button
                              onClick={() =>
                                disconnectUser({
                                  service: service as Service,
                                  setServices,
                                })
                              }
                              colorScheme="red"
                            >
                              Disconnect
                            </Button>
                          </>
                        )}
                      </ButtonGroup>
                    </Box>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </GridItem>
        <GridItem colSpan={14} rowSpan={16} h="100%" w="100%" overflow="scroll">
          {children}
        </GridItem>
      </Grid>
    </main>
  );
}
