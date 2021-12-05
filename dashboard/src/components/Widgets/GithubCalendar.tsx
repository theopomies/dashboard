import { Box } from "@chakra-ui/layout";
import GitHubCalendar from "react-github-calendar";
import { useUser } from "../../hooks/useServices";
import { WidgetCard } from "./WidgetCard";

export function GithubCalendar() {
  const user = useUser("github");

  return (
    <WidgetCard rowSpan={2} colSpan={2} name="calendar">
      <Box
        padding="1rem"
        paddingTop="3rem"
        color="brand.darkGray"
        fontWeight="500"
      >
        <GitHubCalendar
          username={user ? user.id : "theopomies"}
          hideColorLegend
          fontSize={16}
        />
      </Box>
    </WidgetCard>
  );
}
