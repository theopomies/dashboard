import { useState } from "react";
import { ServiceContainer } from "../components/ServiceContainer";
import { GithubCalendar } from "../components/Widgets/GithubCalendar";
import { GithubCommits } from "../components/Widgets/GithubCommits";
import { GithubStars } from "../components/Widgets/GithubStars";
import { TwitterPostTweet } from "../components/Widgets/TwitterPostTweet";
import { WidgetCard } from "../components/Widgets/WidgetCard";

export default function Twitter() {
  const removeX = (x: number) => () =>
    setActives((actives) => ({ ...actives, [x]: false }));
  const [actives, setActives] = useState({
    1: true,
    2: true,
    3: true,
  });
  return (
    <ServiceContainer
      title="Twitter"
      description="Your Twitter widgets in a single place"
      isLogged={true}
    >
      {actives[1] && (
        <WidgetCard closeHandler={removeX(1)} rowSpan={2} colSpan={2}>
          <TwitterPostTweet />
        </WidgetCard>
      )}
      {actives[2] && (
        <WidgetCard closeHandler={removeX(2)} rowSpan={1}>
          <GithubStars />
        </WidgetCard>
      )}
      {actives[3] && (
        <WidgetCard closeHandler={removeX(3)} rowSpan={1}>
          <GithubCommits />
        </WidgetCard>
      )}
    </ServiceContainer>
  );
}
