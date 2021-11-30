import { Button } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { GridItem, GridItemProps } from "@chakra-ui/layout";

export function WidgetCard({
  closeHandler,
  children,
  ...props
}: GridItemProps & { closeHandler: () => void }) {
  return (
    <GridItem
      h="100%"
      bg="white"
      borderRadius=".3rem"
      shadow="sm"
      borderColor="transparent"
      padding="2rem"
      transitionDuration=".2s"
      position="relative"
      _hover={{ shadow: "xl" }}
      {...props}
    >
      <Button
        position="absolute"
        bg="transparent"
        _hover={{ bg: "transparent", color: "brand.darkGray" }}
        top=".3rem"
        right=".6rem"
        color="brand.gray"
        onClick={closeHandler}
      >
        <CloseIcon />
      </Button>
      {children}
    </GridItem>
  );
}
