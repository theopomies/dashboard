import { useRouter } from "next/router";
import { useEffect } from "react";
import { Login } from "../components/Login";
import { ServiceContainer } from "../components/ServiceContainer";
import {
  getAvailableWidgets,
  useServices,
  useUser,
  useWidgets,
} from "../hooks/useServices";

export default function Spotify() {
  const user = useUser("spotify");
  const widgets = useWidgets("spotify");
  const availableWidgets = getAvailableWidgets(widgets, "spotify");
  const [services] = useServices();
  const router = useRouter();

  useEffect(() => {
    if (!router) return;
    if (!services.actives.spotify) router.push("/");
  }, [router, services]);

  return (
    <ServiceContainer
      title="Spotify"
      description="Your Spotify widgets in a single place"
      isLogged={user != null}
      availableWidgets={availableWidgets}
    >
      {user == null ? (
        <Login service="spotify" />
      ) : (
        widgets.map((widget) => widget.component)
      )}
    </ServiceContainer>
  );
}
