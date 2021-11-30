import { Box } from "@chakra-ui/layout";
import GitHubCalendar from "react-github-calendar";

export function GithubCalendar({ username }: { username: string }) {
  return (
    <Box
      padding="1rem"
      paddingTop="3rem"
      color="brand.darkGray"
      fontWeight="500"
    >
      <GitHubCalendar username={username} hideColorLegend fontSize={16} />
    </Box>
  );
}
