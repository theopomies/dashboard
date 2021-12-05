import { Button } from "@chakra-ui/button";
import { Heading, VStack } from "@chakra-ui/layout";

import { WidgetCard } from "./WidgetCard";
import { useUser } from "../../hooks/useServices";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";

export function SpotifyPlayer() {
  const user = useUser("spotify");
  const [spotifyApi, setSpotifyApi] = useState(new SpotifyWebApi());
  const [link, setLink] = useState("album/1DFixLWuPkv3KT3TnV35m3");
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setSpotifyApi((spotifyApi) => {
      spotifyApi.setAccessToken(user.accessToken);
      return spotifyApi;
    });
  }, [user]);
  useEffect(() => {
    spotifyApi.getUserPlaylists().then((value) =>
      setPlaylists(
        value.items.map((item) => ({
          uri: item.uri.split(":").slice(1).join("/"),
          name: item.name,
        }))
      )
    );
  }, [spotifyApi]);

  return (
    <WidgetCard rowSpan={2} colSpan={1} name="player">
      <VStack h="100%">
        <iframe
          src={`https://open.spotify.com/embed/${link}`}
          width="300"
          height="80"
          frameBorder="0"
          allowTransparency={true}
          allow="encrypted-media"
        />
        <VStack overflow="scroll" h="100%">
          <Heading margin="0.3rem" size="lg">
            My Playlists
          </Heading>
          {playlists.map((p) => (
            <Button
              w="100%"
              padding="0.3rem"
              key={p.name}
              onClick={() => setLink(p.uri)}
            >
              {p.name}
            </Button>
          ))}
        </VStack>
      </VStack>
    </WidgetCard>
  );
}
