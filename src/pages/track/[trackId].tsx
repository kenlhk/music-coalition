import { Avatar, Button, Image, Link, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  serverAccessToken,
  spotifyApiWrapper,
  spotifyAxiosClient
} from "../../lib/spotify";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface trackProps {
  track: SpotifyApi.TrackObjectFull;
  artists: SpotifyApi.ArtistObjectFull[];
  album: SpotifyApi.AlbumObjectFull;
}

const Track = (props: trackProps) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <div>
      <Text h2>{props.track.name}</Text>
      <Text h3>{props.artists.map((artist) => artist.name).join(", ")}</Text>
      <Avatar.Group>
        {props.artists.map((artist, index) => (
          <Avatar
            key={index}
            size="xl"
            pointer
            src={artist.images[2].url}
            bordered
            color="gradient"
            stacked
          />
        ))}
      </Avatar.Group>
      {props.album.images[1] ? (
        <Image
          src={props.album.images[1].url}
          width={300}
          height={300}
          autoResize={true}
        />
      ) : (
        <p>No Album Cover</p>
      )}
      {props.track.preview_url ? (
        <div>
          <p>Preview:</p>
          <ReactPlayer
            key={"react-player"}
            url={props.track.preview_url}
            playing={playing}
            width={0}
            height={0}
            onPause={handlePause}
          />
          <Button onClick={handlePlayPause}>
            {playing ? "Pause" : "Play"}
          </Button>
        </div>
      ) : (
        <p>No preview available.</p>
      )}
      {props.track.external_urls.spotify && (
        <div>
          <p>Play full song on Spotify:</p>
          <Link href={props.track.external_urls.spotify} target="_blank">
            Link
          </Link>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await serverAccessToken;

  spotifyApiWrapper.setAccessToken(accessToken);

  const track = await spotifyApiWrapper
    .getTrack(context.query.trackId as string)
    .then((res) => res.body);

  const artists = await Promise.all(
    track.artists.map(async (artist) => {
      const res = await spotifyAxiosClient.get(artist.href, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    })
  );

  return {
    props: {
      track: track,
      artists: artists,
      album: track.album,
    },
  };
};

export default Track;
