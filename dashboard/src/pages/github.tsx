import { truncate } from "fs";
import { useState } from "react";
import { ServiceContainer } from "../components/ServiceContainer";
import { GithubProjectCard } from "../components/Widgets/GithubProjectCard";
import { WidgetCard } from "../components/Widgets/WidgetCard";

export default function Github() {
  const [actives, setActives] = useState({ 1: true, 2: true, 3: true });

  const removeX = (x: number) => () =>
    setActives((actives) => ({ ...actives, [x]: false }));
  return (
    <ServiceContainer
      title="Github"
      description="Your Github widgets in a single place"
      isLogged={true}
    >
      {actives[1] && (
        <WidgetCard closeHandler={removeX(1)}>
          <GithubProjectCard />
        </WidgetCard>
      )}
      {actives[2] && (
        <WidgetCard closeHandler={removeX(2)}>
          <GithubProjectCard />
        </WidgetCard>
      )}
      {actives[3] && (
        <WidgetCard closeHandler={removeX(3)}>
          <GithubProjectCard />
        </WidgetCard>
      )}
    </ServiceContainer>
  );
}
