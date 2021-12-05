import { GridItem, HStack } from "@chakra-ui/layout";
import { Service, useUser } from "../hooks/useServices";
import { GithubLogin } from "./GithubLogin";
import { SolanaLogin } from "./SolanaLogin";
import { SpotifyLogin } from "./SpotifyLogin";

export function Login({ service }: { service?: Service }) {
  const spotifyAccount = useUser("spotify");
  const solanaAccount = useUser("solana");
  const githubAccount = useUser("github");
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
        {(service == undefined || service == "solana") &&
          solanaAccount == undefined && <SolanaLogin />}
        {(service == undefined || service == "github") &&
          githubAccount == undefined && <GithubLogin />}
      </HStack>
    </GridItem>
  );
}
