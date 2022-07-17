import {
  Avatar,
  Button,
  Col,
  Container,
  Image,
  Link,
  Row,
  Text
} from "@nextui-org/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { youtube } from "scrape-youtube";
import Youtube from "scrape-youtube/lib/interface";
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
  videos?: Youtube.Video[];
  lyrics?: string;
}

const Track = (props: trackProps) => {
  const [playing, setPlaying] = useState(false);

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
            css={{ size: "$20", zIndex: 0 }}
            pointer
            src={artist.images.length > 0 ? artist.images[2].url : ""}
            text={artist.images.length == 0 ? artist.name : ""}
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

      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Text h3>Preview:</Text>
            {props.track.preview_url ? (
              <div>
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
          </Col>
          <Col>
            <Text h3>Full Song:</Text>
            {props.track.external_urls.spotify && (
              <div>
                <Link href={props.track.external_urls.spotify} target="_blank">
                  Spotify
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Text h3>Related Videos:</Text>
            {props.videos ? (
              props.videos
                .filter((video, index) => index < 5)
                .map((video, index) => (
                  <ReactPlayer
                    key={index}
                    url={video.link}
                    config={{ youtube: { playerVars: { controls: 1 } } }}
                  />
                ))
            ) : (
              <p>No video found.</p>
            )}
          </Col>
          <Col>
            <Text h3>Lyrics:</Text>
            {props.lyrics ? (
              <span style={{ whiteSpace: "pre-line" }}>{props.lyrics}</span>
            ) : (
              <p>No lyrics found.</p>
            )}
          </Col>
        </Row>
      </Container>
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

  const artistsQueryString = artists.map((artist) => artist.name).join(" ");

  const { videos } = await youtube.search(
    `${track.name} ${artistsQueryString}`
  );

  const Genius = require("genius-lyrics");
  const Client = new Genius.Client();
  let lyrics;
  try {
    const searches = await Client.songs.search(
      `${track.name} ${artistsQueryString}`
    );
    const firstSong = searches[0];
    lyrics = await firstSong.lyrics();
  } catch (error) {
    (error: Error) => console.log(error);
  }

  return {
    props: {
      track: track,
      artists: artists,
      album: track.album,
      videos: videos || null,
      lyrics: lyrics || null,
    },
  };
};

export default Track;
