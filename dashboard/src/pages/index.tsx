import { Heading } from "@chakra-ui/react";
import { GridItem } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Login } from "../components/Login";
import { ServiceContainer } from "../components/ServiceContainer";
import {
  getAvailableWidgets,
  useServices,
  useWidgets,
} from "../hooks/useServices";

export default function Index() {
  const widgets = useWidgets();
  const availableWidgets = getAvailableWidgets(widgets);
  const [{ github, solana, spotify, actives }] = useServices();
  const [isLogged, setLogged] = useState(
    github != undefined || solana != undefined || spotify != undefined
  );

  useEffect(() => {
    setLogged(
      github != undefined || solana != undefined || spotify != undefined
    );
  }, [github, solana, spotify]);

  return (
    <ServiceContainer
      title="Dashboard home"
      description="All of your widgets in one place"
      isLogged={isLogged}
      availableWidgets={availableWidgets}
    >
      {isLogged ? (
        Object.values(actives).some((value) => value) ? (
          widgets.map((widget) => widget.component)
        ) : (
          <GridItem colSpan={3}>
            <Heading size="lg" textAlign="center">
              Please Enable Services to add Widgets
            </Heading>
          </GridItem>
        )
      ) : (
        <Login />
      )}
    </ServiceContainer>
  );
}
