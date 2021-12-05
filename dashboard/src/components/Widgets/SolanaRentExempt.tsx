import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useServices";
import { formatBigNumber } from "../../utils/formatBigNumber";
import { SolanaIcon } from "../icons/SolanaIcon";
import { WidgetCard } from "./WidgetCard";

export function SolanaRentExempt() {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const [cost, setCost] = useState(0);
  const { id } = useUser("solana");
  const [publicKey, setPublicKey] = useState<PublicKey>(new PublicKey(id));
  const [dataLen, setDataLen] = useState(0);

  useEffect(() => {
    setPublicKey(new PublicKey(id));
  }, [id]);

  useEffect(() => {
    connection
      .getMinimumBalanceForRentExemption(dataLen)
      .then((value) => setCost(value));
    const interval = setInterval(
      () =>
        connection
          .getMinimumBalanceForRentExemption(dataLen)
          .then((value) => setCost(value)),
      60000
    );
    return () => clearInterval(interval);
  }, [dataLen]);

  return (
    <WidgetCard rowSpan={1} colSpan={1} name="rentExempt">
      <HStack h="100%" spacing={4} w="100%">
        <Flex
          backgroundColor="brand.lightGray"
          h="4rem"
          w="4rem"
          justify="center"
          align="center"
          borderRadius="100%"
          flexShrink={0}
        >
          <SolanaIcon fontSize="2rem" fill="turquoise" />
        </Flex>
        <VStack align="flex-start">
          <Heading>
            ◎{formatBigNumber(+(cost / LAMPORTS_PER_SOL).toFixed(5))}
          </Heading>
          <Heading
            size="sm"
            color="brand.gray"
            fontWeight="regular"
            lineHeight="2rem"
          >
            <strong>Sol cost</strong> for rent exemption of a
            <NumberInput
              onChange={(_, v) => setDataLen(v)}
              value={dataLen}
              maxW="8rem"
              display="inline-block"
            >
              <NumberInputField display="inline" />
            </NumberInput>{" "}
            bytes account.
          </Heading>
        </VStack>
      </HStack>
    </WidgetCard>
  );
}
