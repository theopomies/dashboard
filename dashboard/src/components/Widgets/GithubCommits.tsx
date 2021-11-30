import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { formatBigNumber } from "../../utils/formatBigNumber";

export function GithubCommits() {
  return (
    <HStack h="100%" spacing={10}>
      <Flex
        backgroundColor="brand.lightGray"
        h="4rem"
        w="4rem"
        justify="center"
        align="center"
        borderRadius="100%"
      >
        <CheckIcon fontSize="2rem" color="brand.darkGray" />
      </Flex>
      <VStack align="flex-start">
        <Heading>{formatBigNumber(6666)}</Heading>
        <Heading size="sm" color="brand.gray" fontWeight="regular">
          <strong>Your</strong> commits to <strong>user/repo</strong>
        </Heading>
      </VStack>
    </HStack>
  );
}
