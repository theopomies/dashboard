import { StarIcon } from "@chakra-ui/icons";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";

export function GithubStars() {
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
        <StarIcon fontSize="2rem" color="brand.darkGray" />
      </Flex>
      <VStack align="flex-start">
        <Heading>100</Heading>
        <Heading size="sm" color="brand.gray" fontWeight="regular">
          Stars on <strong>user/repo</strong>
        </Heading>
      </VStack>
    </HStack>
  );
}
