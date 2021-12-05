import { Login } from "../components/Login";
import { ServiceContainer } from "../components/ServiceContainer";
// import { SolanaBalance } from "../components/Widgets/SolanaBalance";
import { getAvailableWidgets, useUser, useWidgets } from "../hooks/useServices";

export default function Twitter() {
  const user = useUser("solana");
  const widgets = useWidgets("solana");
  const availableWidgets = getAvailableWidgets(widgets, "solana");

  return (
    <ServiceContainer
      title="Solana"
      description="Your Solana blockchain widgets in a single place"
      isLogged={user != null}
      availableWidgets={availableWidgets}
    >
      {user == null ? (
        <Login service="solana" />
      ) : (
        widgets.map((widget) => widget.component)
        // <SolanaBalance />
      )}
    </ServiceContainer>
  );
}
