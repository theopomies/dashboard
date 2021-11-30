import { Container, Flex, Grid, HStack, VStack } from "@chakra-ui/layout";
import { Heading, Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import { WidgetButton } from "../components/WidgetButton";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/popover";

export function ServiceContainer({
  title,
  description,
  children,
  availableWidgets,
  isLogged,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  availableWidgets?: ReactNode;
  isLogged: boolean;
}) {
  return (
    <Container maxW="140ch" padding="2rem" h="100%">
      <VStack align="stretch" h="100%" spacing={14}>
        <HStack justify="space-between" align="end">
          <VStack align="flex-start">
            <Heading fontWeight="500">{title}</Heading>
            <Heading fontWeight="400" size="sm" color="brand.gray">
              {description}
            </Heading>
          </VStack>
          {isLogged && (
            <Popover>
              <PopoverTrigger>
                <Button padding={0} bg="none" margin={0} height="max-content">
                  <WidgetButton />
                </Button>
              </PopoverTrigger>
              <PopoverContent borderColor="transparent" shadow="lg">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  <Heading size="sm">Available Widgets</Heading>
                </PopoverHeader>
                <PopoverBody>{availableWidgets}</PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </HStack>
        <Grid
          templateColumns="repeat(3, 1fr)"
          templateRows="repeat(4, 1fr)"
          gap={5}
          w="100%"
          h="100%"
        >
          {children}
        </Grid>
      </VStack>
    </Container>
  );
}
