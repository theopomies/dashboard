import { StarIcon } from "@chakra-ui/icons";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { formatBigNumber } from "../../utils/formatBigNumber";
import { WidgetCard } from "./WidgetCard";

export function GithubStars() {
  return (
    <WidgetCard rowSpan={1} name="stars">
      <HStack h="100%" spacing={10}>
        <Flex
          backgroundColor="brand.lightGray"
          h="4rem"
          w="4rem"
          justify="center"
          align="center"
          borderRadius="100%"
        >
          <StarIcon fontSize="2rem" color="brand.darkGray" />
        </Flex>
        <VStack align="flex-start">
          <Heading>{formatBigNumber(49874)}</Heading>
          <Heading size="sm" color="brand.gray" fontWeight="regular">
            Stars on <strong>user/repo</strong>
          </Heading>
        </VStack>
      </HStack>
    </WidgetCard>
  );
}
