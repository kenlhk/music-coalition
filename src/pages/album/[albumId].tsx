import { Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { getServerAccessToken, spotifyApiWrapper } from "../../lib/spotify";

interface AlbumPageProps {
  accessToken: string;
  album: SpotifyApi.AlbumObjectFull;
}

const Album = (props: AlbumPageProps) => {
  const [tracks, setTracks] = useState(props.album.tracks.items);

  return (
    <div>
      <Image src={props.album.images[0].url} width={400} height={400} />
      <Text h2>{props.album.name}</Text>
      <Text h3>
        {props.album.artists.map((artist) => artist.name).join(", ")}
      </Text>
      <TableVirtuoso
        style={{ height: 400 }}
        data={tracks}
        itemContent={(index, track) => (
          <>
            <td style={{ width: 150 }}>{track.name}</td>
            <td>{track.name}</td>
          </>
        )}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await getServerAccessToken();

  spotifyApiWrapper.setAccessToken(accessToken);

  const album = await spotifyApiWrapper
    .getAlbum(context.query.albumId as string)
    .then((res) => res.body);

  return {
    props: {
      accessToken: accessToken,
      album: album,
    },
  };
};

export default Album;
