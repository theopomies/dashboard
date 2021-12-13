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

export default function Github() {
  const user = useUser("github");
  const widgets = useWidgets("github");
  const availableWidgets = getAvailableWidgets(widgets, "github");
  const [services] = useServices();
  const router = useRouter();

  useEffect(() => {
    if (!router) return;
    if (!services.actives.github) router.push("/");
  }, [router, services]);

  return (
    <ServiceContainer
      title="Github"
      description="Your Github widgets in a single place"
      isLogged={user != null}
      availableWidgets={availableWidgets}
    >
      {user == null ? (
        <Login service="github" />
      ) : (
        widgets.map((widget) => widget.component)
      )}
    </ServiceContainer>
  );
}
