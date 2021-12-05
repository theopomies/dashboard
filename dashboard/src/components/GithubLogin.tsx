import { Button } from "@chakra-ui/button";
import Link from "next/link";
import { GithubIcon } from "./icons/GithubIcon";

export function GithubLogin() {
  return (
    <Button
      bg="brand.darkGray"
      _hover={{ bg: "brand.gray" }}
      color="white"
      leftIcon={<GithubIcon fill="white" fontSize="1.5rem" />}
    >
      <Link href="/api/auth/github/authorize">Login with Github</Link>
    </Button>
  );
}
