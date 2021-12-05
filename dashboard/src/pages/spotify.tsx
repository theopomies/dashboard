import { Login } from "../components/Login";
import { ServiceContainer } from "../components/ServiceContainer";
import { getAvailableWidgets, useUser, useWidgets } from "../hooks/useServices";

export default function Spotify() {
  const user = useUser("spotify");
  const widgets = useWidgets("spotify");
  const availableWidgets = getAvailableWidgets(widgets, "spotify");

  return (
    <ServiceContainer
      title="Spotify"
      description="Your Spotify widgets in a single place"
      isLogged={user != null}
      availableWidgets={availableWidgets}
    >
      {user == null ? <Login /> : widgets.map((widget) => widget.component)}
    </ServiceContainer>
  );
}
