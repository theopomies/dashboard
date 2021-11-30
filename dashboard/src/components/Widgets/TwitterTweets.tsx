import { GiFeather } from "react-icons/gi";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { formatBigNumber } from "../../utils/formatBigNumber";

export function TwitterTweets() {
  return (
    <HStack h="100%" spacing={10}>
      <Flex
        backgroundColor="brand.lightTwitter"
        h="4rem"
        w="4rem"
        justify="center"
        align="center"
        borderRadius="100%"
        color="brand.twitter"
      >
        <GiFeather fontSize="2rem" />
      </Flex>
      <VStack align="flex-start">
        <Heading>{formatBigNumber(4200, 1)}</Heading>
        <Heading size="sm" color="brand.gray" fontWeight="regular">
          <strong>Tweets</strong> posted
        </Heading>
      </VStack>
    </HStack>
  );
}
