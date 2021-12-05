import { ServiceContainer } from "../components/ServiceContainer";
import { getAvailableWidgets, useWidgets } from "../hooks/useServices";

export default function Twitter() {
  const widgets = useWidgets("twitter");
  const availableWidgets = getAvailableWidgets(widgets, "twitter");

  return (
    <ServiceContainer
      title="Twitter"
      description="Your Twitter widgets in a single place"
      isLogged={true}
      availableWidgets={availableWidgets}
    >
      {widgets.map((widget) => widget.component)}
    </ServiceContainer>
  );
}
