import { Button } from "@chakra-ui/button";
import { SpotifyIcon } from "./icons/SpotifyIcon";
import Link from "next/link";

export function SpotifyLogin() {
  return (
    <Button
      bg="brand.spotify"
      _hover={{ bg: "brand.lightSpotify" }}
      color="white"
      leftIcon={<SpotifyIcon fill="white" fontSize="1.5rem" />}
    >
      <Link href="/api/auth/spotify/authorize">Login with Spotify</Link>
    </Button>
  );
}
