import Script from "next/script";
import { useEffect } from "react";
import useSpotifyPlayerStore from "../../stores/useSpotifyPlayerStore";

interface SpotifyPlayerV2Props {
  accessToken: string;
}

const SpotifyPlayerV2 = (props: SpotifyPlayerV2Props) => {
  const { player, setPlayer, setDeviceId, setIsPaused, setPlaybackState } =
    useSpotifyPlayerStore();

  useEffect(() => {
    if (!player) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "MusicCube",
          getOAuthToken: (cb) => {
            cb(props.accessToken);
          },
          volume: 0.5,
        });

        setPlayer(player);

        // Ready
        player.addListener("ready", ({ device_id }) => {
          setDeviceId(device_id);
          console.log("Ready with Device ID", device_id);
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });

        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("player_state_changed", (state) => {
          console.log(state);
          setPlaybackState(state);
          setIsPaused(state.paused);
        });
        player.connect();
      };
    }
  }, []);

  return (
    <>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="lazyOnload"
      />
    </>
  );
};

export default SpotifyPlayerV2;
