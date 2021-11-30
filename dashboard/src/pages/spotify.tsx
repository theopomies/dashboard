import { useState } from "react";
import { ServiceContainer } from "../components/ServiceContainer";
import { SpotifyPlayer } from "../components/Widgets/SpotifyPlayer";
import { WidgetCard } from "../components/Widgets/WidgetCard";

export default function Spotify() {
  const removeX = (x: number) => () =>
    setActives((actives) => ({ ...actives, [x]: false }));
  const [actives, setActives] = useState({
    1: true,
    2: true,
    3: true,
  });
  return (
    <ServiceContainer
      title="Spotify"
      description="Your Spotify widgets in a single place"
      isLogged={true}
    >
      {actives[1] && (
        <WidgetCard closeHandler={removeX(1)} rowSpan={2} colSpan={2}>
          <SpotifyPlayer />
        </WidgetCard>
      )}
    </ServiceContainer>
  );
}
