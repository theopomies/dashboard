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
      });
      router.replace(service);
    }
  }, [router]);
  useEffect(() => {
    ["spotify", "github", "solana"].forEach((service) => {
      const cookie = Cookies.get(service);
      if (cookie) {
        const { id, accessToken } = JSON.parse(cookie);
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

export function storeUser({
  setServices,
  id,
  service,
  accessToken,
  expiresIn,
  refreshToken,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  id: string;
  service: Service;
  accessToken: string;
  expiresIn?: number;
  refreshToken?: string;
}) {
  Cookies.set(service, JSON.stringify({ accessToken, refreshToken, id }));
  setServices((services) => ({ ...services, [service]: { accessToken, id } }));
}

export function disconnectUser({
  setServices,
  service,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
}) {
  Cookies.remove(service);
  setServices((services) => ({ ...services, [service]: null }));
}

export function enableService({
  setServices,
  service,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
}) {
  setServices((services) => ({
    ...services,
    actives: { ...services.actives, [service]: true },
  }));
}

export function disableService({
  setServices,
  service,
}: {
  setServices: Dispatch<SetStateAction<ServicesState>>;
  service: Service;
}) {
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

export function removeWidget(context: ServicesContext, name: WidgetName) {
  const [, setServices] = context;
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

export function addWidget(context: ServicesContext, name: WidgetName) {
  const [services, setServices] = context;

  if (services.widgets.some((widget) => widget.name == name)) return;

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
