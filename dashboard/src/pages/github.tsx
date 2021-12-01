import { ServiceContainer } from "../components/ServiceContainer";
import { getAvailableWidgets, useWidgets } from "../hooks/useWidgets";

export default function Github() {
  const widgets = useWidgets("github");
  const availableWidgets = getAvailableWidgets(widgets, "github");

  return (
    <ServiceContainer
      title="Github"
      description="Your Github widgets in a single place"
      isLogged={true}
      availableWidgets={availableWidgets}
    >
      {widgets.map((widget) => widget.component)}
    </ServiceContainer>
  );
}
