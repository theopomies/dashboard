import { GridItem, HStack } from "@chakra-ui/layout";
import { Service } from "../hooks/useServices";
import { SpotifyLogin } from "./SpotifyLogin";

export function Login({ service }: { service?: Service }) {
  const spotifyAccount = undefined; //useSpotify();
  // const twitterAccount = useTwitter();
  // const githubAccount = useGithub();
  return (
    <GridItem
      colSpan={3}
      rowSpan={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <HStack>
        {(service == undefined || service == "spotify") &&
          spotifyAccount == undefined && <SpotifyLogin />}
        {/* {(service == undefined || service == "twitter") && twitterAccount == undefined && <TwitterLogin />} */}
        {/* {(service == undefined || service == "github") && githubAccount == undefined && <GithubLogin />} */}
      </HStack>
    </GridItem>
  );
}
