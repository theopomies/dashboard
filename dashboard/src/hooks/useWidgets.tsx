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
  spotifyToken: null | string;
  twitterToken: null | string;
  githubToken: null | string;
}

type ServicesContext = [ServicesState, Dispatch<SetStateAction<ServicesState>>];

const emptyServicesContext: ServicesContext = [
  {
    widgets: [],
    spotifyToken: null,
    twitterToken: null,
    githubToken: null,
  },
  () => {},
];

const ServicesContext = createContext<ServicesContext>(emptyServicesContext);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState({
    widgets: [],
    spotifyToken: null,
    twitterToken: null,
    githubToken: null,
  });

  useEffect(() => {}, []);
  return (
    <ServicesContext.Provider value={[services, setServices]}>
      {children}
    </ServicesContext.Provider>
  );
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
