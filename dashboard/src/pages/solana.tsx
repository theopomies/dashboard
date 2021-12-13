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

export default function Twitter() {
  const user = useUser("solana");
  const widgets = useWidgets("solana");
  const availableWidgets = getAvailableWidgets(widgets, "solana");
  const [services] = useServices();
  const router = useRouter();

  useEffect(() => {
    if (!router) return;
    if (!services.actives.solana) router.push("/");
  }, [router, services]);

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
