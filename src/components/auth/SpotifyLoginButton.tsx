import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSpotifyStore from "../../stores/useSpotifyStore";

interface SpotifyLoginButtonProps {
  accessToken: string;
}

const SpotifyLoginButton = (props: SpotifyLoginButtonProps) => {
  const router = useRouter();

  if (props.accessToken) {
    return <Button disabled>Spotify Connected</Button>;
  }

  return (
    <Button onPress={() => router.push("/api/auth/spotify/login")}>
      Login Spotify
    </Button>
  );
};

export default SpotifyLoginButton;
