import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
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

export function SolanaBalance() {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const [balance, setBalance] = useState(0);
  const { id } = useUser("solana");
  const [publicKey, setPublicKey] = useState<PublicKey>(new PublicKey(id));

  useEffect(() => {
    setPublicKey(new PublicKey(id));
  }, [id]);

  useEffect(() => {
    connection.getBalance(publicKey).then((value) => setBalance(value));
    const interval = setInterval(
      () => connection.getBalance(publicKey).then((value) => setBalance(value)),
      60000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <WidgetCard rowSpan={1} colSpan={1} name="balance">
      <HStack h="100%" spacing={4}>
        <Flex
          backgroundColor="brand.lightGray"
          h="4rem"
          w="4rem"
          justify="center"
          align="center"
          borderRadius="100%"
          flexShrink={0}
        >
          <SolanaIcon fontSize="2rem" fill="brand.solana" />
        </Flex>
        <VStack align="flex-start">
          <Heading>
            ◎{formatBigNumber(+(balance / LAMPORTS_PER_SOL).toFixed(5))}
          </Heading>
          <Heading size="sm" color="brand.gray" fontWeight="regular">
            <strong>Sol</strong> balance of your account
          </Heading>
        </VStack>
      </HStack>
    </WidgetCard>
  );
}
