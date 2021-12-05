import { Link, Text, VStack } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { GithubIcon } from "./icons/GithubIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { SpotifyIcon } from "./icons/SpotifyIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import NextLink from "next/link";
import { SolanaIcon } from "./icons/SolanaIcon";

export function Navbar() {
  const page = useRouter().route;

  return (
    <VStack height="100%" justify="center" align="center" spacing={10}>
      <NextLink href="/">
        <Link>
          <HomeIcon
            h="2rem"
            w="2rem"
            fill={page == "/" ? "#1B1F23" : "brand.gray"}
            _hover={{ fill: "#1B1F23" }}
          />
        </Link>
      </NextLink>
      <NextLink href="/spotify">
        <Link>
          <SpotifyIcon
            h="2rem"
            w="2rem"
            fill={page == "/spotify" ? "brand.spotify" : "brand.gray"}
            _hover={{ fill: "brand.spotify" }}
          />
        </Link>
      </NextLink>
      {/* <NextLink href="/twitter">
        <Link>
          <TwitterIcon
            h="2rem"
            w="2rem"
            fill={page == "/twitter" ? "brand.twitter" : "brand.gray"}
            _hover={{ fill: "brand.twitter" }}
          />
        </Link>
      </NextLink> */}
      <NextLink href="/github">
        <Link>
          <GithubIcon
            h="2rem"
            w="2rem"
            fill={page == "/github" ? "#1B1F23" : "brand.gray"}
            _hover={{ fill: "#1B1F23" }}
          />
        </Link>
      </NextLink>
      <NextLink href="/solana">
        <Link>
          <SolanaIcon
            h="2rem"
            w="2rem"
            fill={page == "/solana" ? "brand.solana" : "brand.gray"}
            _hover={{ fill: "brand.solana" }}
          />
        </Link>
      </NextLink>
    </VStack>
  );
}
