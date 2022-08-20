import { useEffect, useState } from "react";
import useSpotifyPlayerStore from "../../stores/useSpotifyPlayerStore";
import { isValidVolume, loadSpotifySDK } from "./spotifySDK";

interface useSpotifyProps {
  token: string | null;
  playerName: string;
  initialVolume?: number;
  onError?: (error: Spotify.Error) => void;
  onReady?: (deviceId: string) => void;
  onNotReady?: (deviceId: string) => void;
  onPlayerStateChange?: (state: Spotify.PlaybackState) => void;
  refreshToken?: () => void;
}
const emptyFunc = () => {};

const useSpotify = ({
  token,
  playerName,
  initialVolume = 0.5,
  onError = emptyFunc,
  onReady = emptyFunc,
  onNotReady = emptyFunc,
  onPlayerStateChange = emptyFunc,
  refreshToken = emptyFunc,
}: useSpotifyProps) => {
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const createPlayer = () => {
    if (token) {
      if (player) {
        player.disconnect();
      }
      const _player = new Spotify.Player({
        name: playerName,
        getOAuthToken: (cb) => {
          refreshToken();
          cb(token);
        },
        volume: isValidVolume(initialVolume) ? initialVolume : 0.5,
      });

      setPlayer(_player);
      setIsReady(true);
    }
  };

  useEffect(() => {
    (async () => {
      const loaded = await loadSpotifySDK();

      if (!loaded) {
        onError(new Error("Failed to load Spotify SDK"));
        return;
      }
      // in case the player has already been loaded before (i.e token change only)
      if (window.Spotify) {
        createPlayer();
      }
      window.onSpotifyWebPlaybackSDKReady = () => {
        window.Spotify = Spotify;
        createPlayer();
      };
    })();

    () => player?.disconnect();
  }, [token]);

  useEffect(() => {
    if (isReady && player) {
      player.connect();
      player.addListener("not_ready", ({ device_id }) => {
        onNotReady(device_id);
      });
      player.addListener("ready", ({ device_id }) => {
        console.log("Spotify web player id: ", device_id);
        onReady(device_id);
      });
      player.addListener(
        "player_state_changed",
        (state: Spotify.PlaybackState) => {
          setIsPaused(state?.paused);
          onPlayerStateChange(state);
        }
      );
      player.addListener("authentication_error", (error: Spotify.Error) => {
        onError(error);
      });
      player.addListener("account_error", (error: Spotify.Error) => {
        onError(error);
      });
      player.addListener("playback_error", (error: Spotify.Error) => {
        onError(error);
      });
      player.addListener("initialization_error", (error: Spotify.Error) => {
        onError(error);
      });
    }
    () => {
      player?.disconnect();
      player?.removeListener("ready");
      player?.removeListener("player_state_changed");
      player?.removeListener("authentication_error");
      player?.removeListener("account_error");
    };
  }, [isReady, player]);

  return {
    player,
    isReady,
    isPaused,
  };
};

export default useSpotify;
