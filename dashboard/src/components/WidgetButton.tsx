import { Button, ButtonProps } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";

export function WidgetButton({ children: _, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      variant="outline"
      paddingTop="1.5rem"
      paddingBottom="1.5rem"
      borderColor="gray.300"
      backgroundColor="transparent"
    >
      <HStack>
        <AddIcon marginRight="0.3rem" opacity="60%" />
        <Text>Add Widget</Text>
      </HStack>
    </Button>
  );
}
