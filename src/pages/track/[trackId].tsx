import {
  Avatar,
  Col,
  Grid,
  Modal,
  Row,
  Text,
  Tooltip
} from "@nextui-org/react";
import * as Genius from "genius-lyrics";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TbBrandSpotify, TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import { youtube } from "scrape-youtube";
import Youtube from "scrape-youtube/lib/interface";
import {
  Tabs, TabsContent, TabsList,
  TabsTrigger
} from "../../components/Tabs";
import VideoCard from "../../components/VideoCard";
import {
  getServerAccessToken,
  spotifyApiWrapper,
  spotifyAxiosClient
} from "../../lib/spotify";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface TrackPageProps {
  track: SpotifyApi.TrackObjectFull;
  artists: SpotifyApi.ArtistObjectFull[];
  album: SpotifyApi.AlbumObjectFull;
  videos?: Youtube.Video[];
  lyrics?: string;
}

const Track = (props: TrackPageProps) => {
  const [videoLink, setVideoLink] = useState("");
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleVideoModalOpen = (videoLink: string) => {
    setVideoLink(videoLink);
    setVisible(true);
  };

  const handleVideoModalClose = () => {
    setVideoLink("");
    setPlaying(false);
    setVisible(false);
  };

  return (
    <div>
      <Grid.Container alignContent="space-between">
        <Grid md={6}>
          <Col>
            <Text h2>{props.track.name}</Text>
            <Text h3>
              {props.artists.map((artist) => artist.name).join(", ")}
            </Text>
          </Col>
        </Grid>
        <Grid md={6} justify="flex-end">
          <Avatar.Group css={{ float: "right" }}>
            {props.artists.map((artist, index) => (
              <Tooltip
                key={index}
                content={<Text>{artist.name}</Text>}
                rounded
                color="primary"
                placement="bottomStart"
              >
                <Link
                  href={{
                    pathname: "/artist/[artistId]",
                    query: {
                      artistId: artist.id,
                    },
                  }}
                >
                  <Avatar
                    css={{ size: "$20", zIndex: 0 }}
                    pointer
                    src={artist.images.length > 0 ? artist.images[2].url : ""}
                    text={artist.images.length == 0 ? artist.name : ""}
                    bordered
                    color="gradient"
                    stacked
                  />
                </Link>
              </Tooltip>
            ))}
          </Avatar.Group>
        </Grid>
      </Grid.Container>
      <Row justify="center">
        {props.album.images[1] ? (
          <Image src={props.album.images[0].url} height={400} width={400} />
        ) : (
          <p>No Album Cover</p>
        )}
      </Row>
      <br />

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
              <a onClick={handlePlayPause}>
                {playing ? (
                  <TbPlayerPause size={30} />
                ) : (
                  <TbPlayerPlay size={30} />
                )}
              </a>
            </div>
          ) : (
            <p>No preview available.</p>
          )}
        </Col>
        <Col>
          <Text h3>Play full song on:</Text>
          {props.track.external_urls.spotify && (
            <div>
              <Link href={props.track.external_urls.spotify} target="_blank">
                <TbBrandSpotify size={40} color={"#1DB954"} />
              </Link>
            </div>
          )}
        </Col>
      </Row>
      <br />

      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">
            <Text h3>Videos</Text>
          </TabsTrigger>
          <TabsTrigger value="tab2">
            <Text h3>Lyrics</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <Text h3>Related Videos:</Text>
          {props.videos ? (
            <Grid.Container gap={2} alignItems={"center"} justify={"center"}>
              {props.videos.map((video, index) => (
                <Grid
                  key={index}
                  onClick={() => handleVideoModalOpen(video.link)}
                >
                  <VideoCard title={video.title} thumbnail={video.thumbnail} />
                </Grid>
              ))}
            </Grid.Container>
          ) : (
            <p>No video found.</p>
          )}
        </TabsContent>
        <TabsContent value="tab2">
          <Text h3>Lyrics:</Text>
          {props.lyrics ? (
            <Text style={{ whiteSpace: "pre-line" }}>{props.lyrics}</Text>
          ) : (
            <p>No lyrics found.</p>
          )}
        </TabsContent>
      </Tabs>

      <Modal
        open={visible}
        onClose={handleVideoModalClose}
        blur
        width="70%"
        css={{ borderRadius: 20, alignItems: "center", height: "80vh" }}
        closeButton
      >
        <Modal.Body style={{ width: "90%" }}>
          <ReactPlayer
            url={videoLink}
            config={{ youtube: { playerVars: { controls: 1 } } }}
            width="100%"
            height="100%"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await getServerAccessToken();

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

  // Fetch videos from YouTube
  const { videos } = await youtube.search(
    `${track.name} ${artistsQueryString}`
  );

  // Fetch lyrics from Genius
  const client = new Genius.Client();
  let lyrics;
  try {
    const searches = await client.songs.search(
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
