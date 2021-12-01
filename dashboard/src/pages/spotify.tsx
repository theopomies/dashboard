import { ServiceContainer } from "../components/ServiceContainer";
import { getAvailableWidgets, useWidgets } from "../hooks/useWidgets";

export default function Spotify() {
  const widgets = useWidgets("spotify");
  const availableWidgets = getAvailableWidgets(widgets, "spotify");

  return (
    <ServiceContainer
      title="Spotify"
      description="Your Spotify widgets in a single place"
      isLogged={true}
      availableWidgets={availableWidgets}
    >
      {widgets.map((widget) => widget.component)}
    </ServiceContainer>
  );
}
