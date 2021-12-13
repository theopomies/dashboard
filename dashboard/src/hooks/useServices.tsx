import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { GithubCalendar } from "../components/Widgets/GithubCalendar";
import { GithubCommits } from "../components/Widgets/GithubCommits";
import { GithubStars } from "../components/Widgets/GithubStars";
import { SpotifyPlayer } from "../components/Widgets/SpotifyPlayer";
import Cookies from "js-cookie";
import { SolanaBalance } from "../components/Widgets/SolanaBalance";
import { SolanaRentExempt } from "../components/Widgets/SolanaRentExempt";
import axios from "axios";

const endpoint = (service: Service) => `http://localhost:8080/${service}/`;

export type Service = "spotify" | "solana" | "github";
export type WidgetName =
  | "player"
  | "calendar"
  | "stars"
  | "commits"
  | "balance"
  | "rentExempt";

interface ServiceWidget {
  service: Service;
  name: WidgetName;
  component: ReactElement;
}

interface ServicesState {
  widgets: ServiceWidget[];
  spotify: null | { id: string; accessToken: string };
  solana: null | { id: string; accessToken: string };
  github: null | { id: string; accessToken: string };
  actives: {
    spotify: boolean;
    solana: boolean;
    github: boolean;
  };
}

type ServicesContext = [ServicesState, Dispatch<SetStateAction<ServicesState>>];

const emptyServicesState: ServicesState = {
  widgets: [],
  spotify: null,
  solana: null,
  github: null,
  actives: {
    spotify: false,
    solana: false,
    github: false,
  },
};

const emptyServicesContext: ServicesContext = [emptyServicesState, () => {}];

const ServicesContext = createContext<ServicesContext>(emptyServicesContext);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState(emptyServicesState);
  const router = useRouter();
  useEffect(() => {
    const { access_token, expires_in, refresh_token, id } = router.query;
    const service = router.pathname.slice(1) as Service;
    if (access_token) {
      storeUser({
        setServices,
        id: id as string,
        service,
        accessToken: access_token as string,
        expiresIn: +expires_in,
        refreshToken: refresh_token as string,
        services,
      });
      router.replace(service);
    }
  }, [router]);
  useEffect(() => {
    ["spotify", "github", "solana"].forEach((service) => {
      const cookie = Cookies.get(service);
      if (cookie) {
        const { id, accessToken } = JSON.parse(cookie);
        setServicesFromApi({
          service: service as Service,
          services,
          setServices,
          id,
        });
        setServices((services) => ({
          ...services,
          [service]: { id, accessToken },
        }));
      }
    });
  }, []);

  return (
    <ServicesContext.Provider value={[services, setServices]}>
      {children}
    </ServicesContext.Provider>
  );
}

async function setServicesFromApi({
  service,
  services,
  setServices,
  id,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
  services: ServicesState;
  id: string;
}) {
  const response = await axios.get(endpoint(service) + id);
  if (service == "github") {
    if (response.data.calendarWidgetActive)
      addWidget([services, setServices], "calendar", true);
    else removeWidget([services, setServices], "calendar", true);
    if (response.data.starsWidgetActive)
      addWidget([services, setServices], "stars", true);
    else removeWidget([services, setServices], "stars", true);
    if (response.data.commitsWidgetActive)
      addWidget([services, setServices], "commits", true);
    else removeWidget([services, setServices], "commits", true);
  } else if (service == "solana") {
    if (response.data.balanceWidgetActive)
      addWidget([services, setServices], "balance", true);
    else removeWidget([services, setServices], "balance", true);
    if (response.data.rentExemptWidgetActive)
      addWidget([services, setServices], "rentExempt", true);
    else removeWidget([services, setServices], "rentExempt", true);
  } else {
    if (response.data.playerWidgetActive)
      addWidget([services, setServices], "player", true);
    else removeWidget([services, setServices], "player", true);
  }
  return response;
}

export async function storeUser({
  setServices,
  id,
  service,
  accessToken,
  expiresIn,
  refreshToken,
  services,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
  services: ServicesState;
  id: string;
  accessToken: string;
  expiresIn?: number;
  refreshToken?: string;
}) {
  Cookies.set(service, JSON.stringify({ accessToken, refreshToken, id }));
  const response = await setServicesFromApi({
    service,
    services,
    setServices,
    id,
  });
  setServices((services) => ({
    ...services,
    actives: { ...services.actives, [service]: response.data.active },
    [service]: { accessToken, id },
  }));
}

export function disconnectUser({
  setServices,
  service,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
}) {
  Cookies.remove(service);
  setServices((services) => ({
    ...services,
    [service]: null,
    actives: { ...services.actives, [service]: false },
  }));
}

export function enableService({
  setServices,
  service,
  services,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
  services: ServicesState;
}) {
  const { id } = services[service];
  axios.put(endpoint(service) + id, { active: true }).catch(console.log);
  setServices((services) => ({
    ...services,
    actives: { ...services.actives, [service]: true },
  }));
}

export function disableService({
  setServices,
  service,
  services,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
  services: ServicesState;
}) {
  const { id } = services[service];
  axios.put(endpoint(service) + id, { active: false }).catch(console.log);
  setServices((services) => ({
    ...services,
    actives: { ...services.actives, [service]: false },
  }));
}

export function useServices(): ServicesContext {
  return useContext(ServicesContext);
}

export function useWidgets(service?: Service): ServiceWidget[] {
  const [services] = useContext(ServicesContext);
  if (service)
    return services.widgets.filter(
      (widget) =>
        services.actives[widget.service] &&
        widget.service == service &&
        services[service] != null
    );
  return services.widgets.filter(
    (widget) =>
      services.actives[widget.service] && services[widget.service] != null
  );
}

export function removeWidget(
  context: ServicesContext,
  name: WidgetName,
  dontPersist: boolean = false
) {
  const [services, setServices] = context;
  if (!dontPersist) {
    const service = allWidgets[name].service;
    const { id } = services[service];
    axios
      .put(endpoint(service) + id, { [`${name}WidgetActive`]: false })
      .catch(console.log);
  }
  setServices(({ widgets, ...services }) => ({
    ...services,
    widgets: widgets.filter((widget) => widget.name != name),
  }));
}

const allWidgets: { [k in WidgetName]: ServiceWidget } = {
  player: {
    service: "spotify",
    name: "player",
    component: <SpotifyPlayer key="player" />,
  },
  calendar: {
    service: "github",
    name: "calendar",
    component: <GithubCalendar key="calendar" />,
  },
  stars: {
    service: "github",
    name: "stars",
    component: <GithubStars key="stars" />,
  },
  commits: {
    service: "github",
    name: "commits",
    component: <GithubCommits key="commits" />,
  },
  balance: {
    service: "solana",
    name: "balance",
    component: <SolanaBalance key="balance" />,
  },
  rentExempt: {
    service: "solana",
    name: "rentExempt",
    component: <SolanaRentExempt key="rentExempt" />,
  },
};

export function addWidget(
  context: ServicesContext,
  name: WidgetName,
  dontPersist: boolean = false
) {
  const [services, setServices] = context;

  if (services.widgets.some((widget) => widget.name == name)) return;
  if (!dontPersist) {
    const service = allWidgets[name].service;
    const { id } = services[service];
    axios
      .put(endpoint(service) + id, { [`${name}WidgetActive`]: true })
      .catch(console.log);
  }
  setServices(({ widgets, ...services }) => ({
    ...services,
    widgets: [...widgets, allWidgets[name]],
  }));
}

export function getAvailableWidgets(
  widgets: ServiceWidget[],
  service?: Service
): { name: WidgetName; service: Service }[] {
  return (Object.entries(allWidgets) as [WidgetName, ServiceWidget][])
    .filter(
      ([name, { service: wService }]) =>
        !widgets.some((widget) => widget.name == name) &&
        (service == undefined || service == wService)
    )
    .map(([name, { service }]) => ({
      name,
      service,
    }));
}

export const displayNames: { [K in WidgetName]: string } = {
  player: "Spotify Player",
  calendar: "Contribution Calendar",
  commits: "Github Commits",
  stars: "Repo Stars",
  balance: "Sol Balance",
  rentExempt: "Solana Rent exemption",
};

export function useUser(
  service: Service
): null | { id: string; accessToken: string } {
  const [services] = useServices();
  return services[service];
}
