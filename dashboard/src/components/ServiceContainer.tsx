import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  HStack,
  VStack,
} from "@chakra-ui/layout";
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
import {
  addWidget,
  displayNames,
  Service,
  useServices,
  WidgetName,
} from "../hooks/useServices";

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
  availableWidgets?: { name: WidgetName; service: Service }[];
  isLogged: boolean;
}) {
  const servicesContext = useServices();
  availableWidgets.sort((a, b) =>
    a.service > b.service ? 1 : a.service < b.service ? -1 : 0
  );
  const spotify = availableWidgets.filter((w) => w.service == "spotify");
  const solana = availableWidgets.filter((w) => w.service == "solana");
  const github = availableWidgets.filter((w) => w.service == "github");
  const widgets = { spotify, solana, github };

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
                <PopoverBody>
                  {Object.entries(widgets).map(([name, widgets]) => (
                    <Box key={name}>
                      {widgets.length > 0 && (
                        <>
                          <Heading size="xs">
                            {name[0].toUpperCase() + name.slice(1)}
                          </Heading>
                          <Divider marginBottom="1rem" />
                          {widgets.map(({ name }) => (
                            <Button
                              onClick={() => addWidget(servicesContext, name)}
                              key={name}
                              margin="0.5rem"
                            >
                              {displayNames[name]}
                            </Button>
                          ))}
                        </>
                      )}
                    </Box>
                  ))}
                </PopoverBody>
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
