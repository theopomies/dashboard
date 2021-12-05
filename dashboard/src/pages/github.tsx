import { Login } from "../components/Login";
import { ServiceContainer } from "../components/ServiceContainer";
import { getAvailableWidgets, useUser, useWidgets } from "../hooks/useServices";

export default function Github() {
  const user = useUser("github");
  const widgets = useWidgets("github");
  const availableWidgets = getAvailableWidgets(widgets, "github");

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
