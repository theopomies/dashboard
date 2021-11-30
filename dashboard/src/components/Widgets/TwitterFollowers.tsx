import { IoIosPeople } from "react-icons/io";
import { Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import { formatBigNumber } from "../../utils/formatBigNumber";

export function TwitterFollowers() {
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
        <IoIosPeople fontSize="2rem" color="brand.darkGray" />
      </Flex>
      <VStack align="flex-start">
        <Heading>{formatBigNumber(1500000, 1)}</Heading>
        <Heading size="sm" color="brand.gray" fontWeight="regular">
          Users <strong>follow you</strong>
        </Heading>
      </VStack>
    </HStack>
  );
}
