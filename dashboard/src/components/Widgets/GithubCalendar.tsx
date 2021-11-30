import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/layout";
import GitHubCalendar from "react-github-calendar";

export function GithubCalendar() {
  return (
    <Box
      padding="1rem"
      paddingTop="3rem"
      color="brand.darkGray"
      fontWeight="500"
    >
      <GitHubCalendar username="theopomies" hideColorLegend fontSize={16} />
    </Box>
  );
}
