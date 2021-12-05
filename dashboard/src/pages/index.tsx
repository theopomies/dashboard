import { ServiceContainer } from "../components/ServiceContainer";
import { getAvailableWidgets, useWidgets } from "../hooks/useServices";

export default function Index() {
  const widgets = useWidgets();
  const availableWidgets = getAvailableWidgets(widgets);

  return (
    <ServiceContainer
      title="Dashboard home"
      description="All of your widgets in one place"
      isLogged={true}
      availableWidgets={availableWidgets}
    >
      {widgets.map((widget) => widget.component)}
    </ServiceContainer>
  );
}
