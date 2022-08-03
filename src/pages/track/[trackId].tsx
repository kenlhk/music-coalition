import { Avatar, Grid, Modal, Text, Tooltip } from "@nextui-org/react";
import * as Genius from "genius-lyrics";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ItunesSearchOptions, searchItunes } from "node-itunes-search";
import { useState } from "react";
import {
  BsApple,
  BsFillPlayCircleFill,
  BsPauseCircleFill,
  BsSpotify,
} from "react-icons/bs";
import { youtube } from "scrape-youtube";
import Youtube from "scrape-youtube/lib/interface";
import SaveButton from "../../components/track/SaveButton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/Tabs";
import VideoCard from "../../components/VideoCard";
import {
  getServerAccessToken,
  spotifyApiWrapper,
  spotifyAxiosClient,
} from "../../lib/spotify";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface TrackPageProps {
  track: SpotifyApi.TrackObjectFull;
  artists: SpotifyApi.ArtistObjectFull[];
  album: SpotifyApi.AlbumObjectFull;
  videos?: Youtube.Video[];
  lyrics?: string;
  itunesURL?: string;
  saved?: boolean;
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
    setPlaying(false);
    setVideoLink(videoLink);
    setVisible(true);
  };

  const handleVideoModalClose = () => {
    setVideoLink("");
    setPlaying(false);
    setVisible(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row justify-between w-full item-stretch">
        <div className="flex flex-col">
          <Text className="text-2xl md:text-3xl font-bold">
            {props.track.name}
          </Text>
          <Text className="text-base md:text-2xl">
            {props.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </div>
        <div className="flex justify-end">
          <Avatar.Group
            count={
              props.artists.length - 4 > 0
                ? props.artists.length - 4
                : undefined
            }
          >
            {props.artists
              .filter((artist, index) => index < 4)
              .map((artist, index) => (
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
                      css={{ size: "10vh", zIndex: 0 }}
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
        </div>
      </div>

      <div className="flex justify-center w-full">
        {props.album.images[1] ? (
          <Image
            src={props.album.images[0].url}
            height={300}
            width={300}
            alt="Cover"
          />
        ) : (
          <p>No Album Cover</p>
        )}
      </div>
      <div className="flex justify-center">
        <SaveButton />
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="tab1" className="max-w-6xl">
          <TabsList>
            <TabsTrigger value="tab1">
              <Text h4>Details</Text>
            </TabsTrigger>
            <TabsTrigger value="tab2">
              <Text h4>Videos</Text>
            </TabsTrigger>
            <TabsTrigger value="tab3">
              <Text h4>Lyrics</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="flex flex-col md:flex-row justify-around gap-5">
              <div className="flex flex-col items-center">
                <Text h4>Preview:</Text>
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
                        <BsPauseCircleFill size={40} />
                      ) : (
                        <BsFillPlayCircleFill size={40} />
                      )}
                    </a>
                  </div>
                ) : (
                  <Text>No preview available.</Text>
                )}
              </div>
              <div className="flex flex-col items-center">
                <Text h4>Play full song on:</Text>
                <div className="flex justify-center gap-x-10 w-full">
                  {props.track.external_urls.spotify && (
                    <a
                      href={props.track.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsSpotify size={40} color={"#1DB954"} />
                    </a>
                  )}
                  {props.itunesURL && (
                    <a
                      href={props.itunesURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsApple size={40} color={"#A2AAAD"} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            {props.videos ? (
              <Grid.Container gap={1} justify={"center"}>
                {props.videos.map((video, index) => (
                  <Grid
                    key={index}
                    onClick={() => handleVideoModalOpen(video.link)}
                  >
                    <VideoCard
                      title={video.title}
                      thumbnail={video.thumbnail}
                    />
                  </Grid>
                ))}
              </Grid.Container>
            ) : (
              <p>No video found.</p>
            )}
          </TabsContent>
          <TabsContent value="tab3">
            {props.lyrics ? (
              <Text style={{ whiteSpace: "pre-line" }}>{props.lyrics}</Text>
            ) : (
              <p>No lyrics found.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Modal
        open={visible}
        onClose={handleVideoModalClose}
        blur
        width="1000px"
        closeButton
      >
        <Modal.Body css={{ height: "75vh", pt: 30 }}>
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

  // Fetch the track in iTunes
  const searchOptions = new ItunesSearchOptions({
    term: `${encodeURIComponent(track.name)} ${encodeURIComponent(
      artistsQueryString
    )}`,
    limit: 1,
  });

  const itunesURL = await searchItunes(searchOptions).then((res) =>
    res.resultCount > 0 ? res.results[0].trackViewUrl : ""
  );

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
      itunesURL: itunesURL,
    },
  };
};

export default Track;
