import { Button } from "@chakra-ui/button";
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";

export function TwitterPostTweet() {
  const maxLen = 280;
  const isValid = (tweet: string) => tweet.length > 0 && tweet.length <= maxLen;
  const [tweet, setTweet] = useState("");
  return (
    <VStack align="start" w="100%" h="100%" justify="strech" spacing={4}>
      <Heading>Tweet</Heading>
      <Textarea
        placeholder="What's happening?"
        w="100%"
        isInvalid={!isValid(tweet) && tweet != ""}
        borderColor="transparent"
        errorBorderColor="brand.error"
        _placeholder={{ fontWeight: "bold" }}
        resize="none"
        flexGrow={1}
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />
      <HStack justifyContent="space-between" w="100%">
        <Text color="brand.error">
          {tweet.length > maxLen && `Too long! Max ${maxLen} chars.`}
        </Text>
        <Button
          bg="brand.twitter"
          color="white"
          borderRadius="5rem"
          disabled={!isValid(tweet)}
        >
          Tweet
        </Button>
      </HStack>
    </VStack>
  );
}
