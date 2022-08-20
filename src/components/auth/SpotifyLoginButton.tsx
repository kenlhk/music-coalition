import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSpotifyStore from "../../stores/useSpotifyStore";

const SpotifyLoginButton = () => {
  const router = useRouter();

  const { accessToken, setAccessToken } = useSpotifyStore();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/auth/token", {
        params: {
          provider: "Spotify",
        },
      });
      setAccessToken(res.data);
    })();
  }, []);

  if (accessToken) {
    return <Button disabled>Spotify Connected</Button>;
  }

  return (
    <Button onPress={() => router.push("/api/auth/spotify/login")}>
      Login Spotify
    </Button>
  );
};

export default SpotifyLoginButton;
