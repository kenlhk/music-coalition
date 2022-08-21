import { Text } from "@nextui-org/react";
import { Router } from "next/router";
import { useState } from "react";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import shallow from "zustand/shallow";
import { spotifyAxiosClient } from "../../lib/spotify";
import useSpotifyPlayerStore from "../../stores/useSpotifyPlayerStore";
import useSpotifyStore from "../../stores/useSpotifyStore";
import useSpotify from "./useSpotify";

const SpotifyPlayer = () => {
  const { deviceId, setDeviceId, currentTrack } = useSpotifyPlayerStore();
  const [playbackState, setPlaybackState] = useState<Spotify.PlaybackState>();
  const [error, setError] = useState("");

  const { accessToken } = useSpotifyStore(
    (state) => ({ accessToken: state.accessToken }),
    shallow
  );

  const { player, isReady, isPaused } = useSpotify({
    token: accessToken?.access_token || "",
    playerName: "MusicCube Spotify Player",
    onReady: (deviceId) => {
      setDeviceId(deviceId);
    },
    onPlayerStateChange: (state) => {
      if (!state) {
        return;
      }
      setPlaybackState(state);
    },
    onError: (error) => {
      setError(error.message);
      console.log(error);
    },
  });

  const handleClick = async () => {
    if (!playbackState) {
      await spotifyAxiosClient.put(
        "/me/player/play",
        {
          uris: [currentTrack?.uri],
          position_ms: 0,
        },
        {
          params: {
            device_id: deviceId,
          },
          headers: {
            Authorization: `Bearer ${accessToken?.access_token}`,
          },
        }
      );
    }

    player?.togglePlay();
  };

  Router.events.on("routeChangeComplete", () => {
    player?.pause();
  });

  return (
    <div className="flex flex-col items-center">
      <button onClick={handleClick}>
        {isPaused ? (
          <BsFillPlayCircleFill size={40} />
        ) : (
          <BsPauseCircleFill size={40} />
        )}
      </button>
      <Text color="error">{error}</Text>
    </div>
  );
};

export default SpotifyPlayer;
