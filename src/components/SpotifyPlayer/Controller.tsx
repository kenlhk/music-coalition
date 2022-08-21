import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { spotifyAxiosClient } from "../../lib/spotify";
import useSpotifyPlayerStore from "../../stores/useSpotifyPlayerStore";

interface ControllerProps {
  accessToken: string;
}

const Controller = (props: ControllerProps) => {
  const { deviceId, currentTrack, playbackState, player, isPaused } =
    useSpotifyPlayerStore();

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
            Authorization: `Bearer ${props.accessToken}`,
          },
        }
      );
    }

    player?.togglePlay();
  };

  return (
    <div className="flex justify-center">
      <button onClick={handleClick}>
        {isPaused ? (
          <BsFillPlayCircleFill size={40} />
        ) : (
          <BsPauseCircleFill size={40} />
        )}
      </button>
    </div>
  );
};

export default Controller;
