import dynamic from "next/dynamic";
import StaticReactPlayer from "react-player";
import useBackgroundPlayerStore from "../stores/useBackgroundPlayerStore";

const ReactPlayer = dynamic<React.ComponentProps<typeof StaticReactPlayer>>(
  import("react-player").then((mod) => mod),
  { ssr: false }
);

const BackgroundPlayer = () => {
  const { url, setUrl, playing, setPlaying } = useBackgroundPlayerStore();

  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <ReactPlayer
      key={"baclground-player"}
      url={url || ""}
      playing={playing}
      width={0}
      height={0}
      onPause={handlePause}
      style={{ display: "none" }}
    />
  );
};

export default BackgroundPlayer;
