import { Button } from "@chakra-ui/button";
import { Heading, VStack } from "@chakra-ui/layout";

import { WidgetCard } from "./WidgetCard";
import { endpoint, useUser } from "../../hooks/useServices";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";
import axios from "axios";

const DEFAULT_PLAYLIST = "album/1DFixLWuPkv3KT3TnV35m3";

export function SpotifyPlayer() {
  const user = useUser("spotify");
  const [spotifyApi, setSpotifyApi] = useState(new SpotifyWebApi());
  const [link, setLink] = useState(DEFAULT_PLAYLIST);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setSpotifyApi((spotifyApi) => {
      spotifyApi.setAccessToken(user.accessToken);
      return spotifyApi;
    });
    axios
      .get(endpoint("spotify") + user.id)
      .then((res) => setLink(res.data.playerWidgetSongLink || DEFAULT_PLAYLIST))
      .catch(console.log);
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

  useEffect(() => {
    if (link == DEFAULT_PLAYLIST) return;
    axios
      .put(endpoint("spotify") + user.id, { playerWidgetSongLink: link })
      .catch(console.log);
  }, [link]);

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
