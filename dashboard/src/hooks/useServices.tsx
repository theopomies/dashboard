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
import { TwitterFollowers } from "../components/Widgets/TwitterFollowers";
import { TwitterPostTweet } from "../components/Widgets/TwitterPostTweet";
import { TwitterTweets } from "../components/Widgets/TwitterTweets";
import Cookies from "js-cookie";

export type Service = "spotify" | "twitter" | "github";
export type WidgetName =
  | "player"
  | "postTweet"
  | "followers"
  | "tweets"
  | "calendar"
  | "stars"
  | "commits";

interface ServiceWidget {
  service: Service;
  name: WidgetName;
  component: ReactElement;
}

interface ServicesState {
  widgets: ServiceWidget[];
  spotify: null | { id: string; accessToken: string };
  twitter: null | { id: string; accessToken: string };
  github: null | { id: string; accessToken: string };
}

type ServicesContext = [ServicesState, Dispatch<SetStateAction<ServicesState>>];

const emptyServicesContext: ServicesContext = [
  {
    widgets: [],
    spotify: null,
    twitter: null,
    github: null,
  },
  () => {},
];

const ServicesContext = createContext<ServicesContext>(emptyServicesContext);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState({
    widgets: [],
    spotify: null,
    twitter: null,
    github: null,
  });
  const router = useRouter();
  useEffect(() => {
    const { access_token, expires_in, refresh_token, id } = router.query;
    const service = router.pathname.slice(1) as Service;
    if (access_token) {
      storeUser(
        setServices,
        id as string,
        service,
        access_token as string,
        +expires_in,
        refresh_token as string
      );
      router.replace(service);
    }
  }, [router]);
  useEffect(() => {
    ["spotify", "github", "twitter"].forEach((service) => {
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

async function storeUser(
  setServices: Dispatch<SetStateAction<ServicesState>>,
  id: string,
  service: Service,
  accessToken: string,
  expiresIn: number,
  refreshToken: string
) {
  Cookies.set(service, JSON.stringify({ accessToken, refreshToken, id }));
  setServices((services) => ({ ...services, [service]: { accessToken, id } }));
}

export function useServices(): ServicesContext {
  return useContext(ServicesContext);
}

export function useWidgets(service?: Service): ServiceWidget[] {
  const [services] = useContext(ServicesContext);
  if (service)
    return services.widgets.filter((widget) => widget.service == service);
  return services.widgets;
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
    component: <SpotifyPlayer />,
  },
  postTweet: {
    service: "twitter",
    name: "postTweet",
    component: <TwitterPostTweet />,
  },
  tweets: {
    service: "twitter",
    name: "tweets",
    component: <TwitterTweets />,
  },
  followers: {
    service: "twitter",
    name: "followers",
    component: <TwitterFollowers />,
  },
  calendar: {
    service: "github",
    name: "calendar",
    component: <GithubCalendar />,
  },
  stars: {
    service: "github",
    name: "stars",
    component: <GithubStars />,
  },
  commits: {
    service: "github",
    name: "commits",
    component: <GithubCommits />,
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
  followers: "Followers Count",
  postTweet: "Tweet Poster",
  stars: "Repo Stars",
  tweets: "Tweet count",
};

export function useUser(
  service: Service
): null | { id: string; accessToken: string } {
  const [services] = useServices();
  return services[service];
}
