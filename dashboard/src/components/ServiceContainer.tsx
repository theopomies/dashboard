import { Container, HStack, VStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import { WidgetButton } from "../components/WidgetButton";

export function ServiceContainer({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Container maxW="140ch" padding="2rem">
      <HStack justify="space-between" align="end">
        <VStack align="flex-start">
          <Heading fontWeight="500">{title}</Heading>
          <Heading fontWeight="400" size="sm" color="brand.gray">
            {description}
          </Heading>
        </VStack>
        <WidgetButton />
      </HStack>
      {children}
    </Container>
  );
}
