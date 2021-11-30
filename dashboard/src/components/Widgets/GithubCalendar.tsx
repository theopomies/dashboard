import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import GitHubCalendar from "react-github-calendar";

export function GithubCalendar() {
  return (
    <Box padding="1rem" paddingTop="3rem" color="brand.darkGray">
      <GitHubCalendar username="theopomies" hideColorLegend />
    </Box>
  );
}
