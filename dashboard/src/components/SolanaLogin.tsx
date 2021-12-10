import { Button } from "@chakra-ui/button";
import { storeUser, useServices } from "../hooks/useServices";
import { SolanaIcon } from "./icons/SolanaIcon";

export function SolanaLogin() {
  const [services, setServices] = useServices();
  const login = async () => {
    try {
      const { solana } = window as any;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana
            .connect({ onlyIfTrusted: true })
            .catch(async () => await solana.connect());
          const walletAddress = response.publicKey.toString();
          await storeUser({
            services: services,
            service: "solana",
            accessToken: walletAddress,
            id: walletAddress,
            setServices,
          });
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Button
      bg="brand.solana"
      _hover={{ bg: "brand.lightSolana" }}
      color="white"
      leftIcon={<SolanaIcon fill="white" fontSize="1.5rem" />}
      onClick={() => login()}
    >
      Login with Solana
    </Button>
  );
}
