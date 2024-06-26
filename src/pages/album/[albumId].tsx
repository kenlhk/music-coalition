import { Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { saveAlbum } from "../../lib/db/services/album";
import { spotifyApiWrapper } from "../../lib/spotify";

const AlbumTable = dynamic(() => import("../../components/album/AlbumTable"), {
  ssr: false,
});

interface AlbumPageProps {
  album: SpotifyApi.AlbumObjectFull;
}

const Album = (props: AlbumPageProps) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col items-center p-5">
        <Image
          src={props.album.images[0].url}
          height={250}
          width={250}
          alt="Cover"
        />
        <Text h4>{props.album.name}</Text>
        <Text h5>
          {props.album.artists.map((artist) => artist.name).join(", ")}
        </Text>
      </div>

      <div className="flex flex-grow justify-center">
        <AlbumTable tracks={props.album.tracks.items} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await spotifyApiWrapper();

  const albumRes = await client.getAlbum(context.query.albumId as string);
  const album = albumRes.body;
  await saveAlbum(album);

  return {
    props: {
      album: album,
    },
  };
};

export default Album;
