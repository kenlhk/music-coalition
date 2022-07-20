import { Grid, Text } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import TrackCard from "../../../components/TrackCard";
import { spotifyApiWrapper, spotifyAxiosClient } from "../../../lib/spotify";

interface searchTracksProps {
  serverAccessToken: string;
  initialTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
}

const SearchTracks = (props: searchTracksProps) => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);

  const fetcher = async ({ pageParam = "" }) => {
    const {
      data: { accessToken },
    } = await axios.get("/api/auth/token");
    spotifyApiWrapper.setAccessToken(accessToken);

    if (pageParam !== "") {
      const res = await spotifyAxiosClient
        .get(pageParam, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data.tracks);
      return res;
    }

    const res = await spotifyApiWrapper
      .search(prompt as string, ["track"], { limit: 50 })
      .then((res) => res.body.tracks);

    return res;
  };

  const { fetchNextPage, hasNextPage, error } = useInfiniteQuery(
    "tracks",
    fetcher,
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.next;
      },
      enabled: router.isReady,
      cacheTime: 0,
      staleTime: 0,
      onSuccess: (data) =>
        updateAllItems(data?.pages.flatMap((page) => page.items)),
    }
  );

  const updateAllItems = (items: SpotifyApi.TrackObjectFull[]) => {
    setTracks(items);
  };

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <Text h2>Tracks</Text>
      <VirtuosoGrid
        style={{ height: "77vh" }}
        totalCount={tracks.length}
        endReached={() => {
          fetchNextPage();
        }}
        components={{
          Item: Grid,
          List: Grid.Container,
        }}
        itemContent={(index) => (
          <Grid>
            <Link
              href={{
                pathname: "/track/[trackId]",
                query: {
                  trackId: tracks[index].id,
                },
              }}
            >
              <a>
                <TrackCard
                  key={index.toString()}
                  name={tracks[index].name}
                  artistNames={tracks[index].artists.map(
                    (artist: SpotifyApi.ArtistObjectSimplified) => artist.name
                  )}
                  cover={
                    tracks[index].album.images.length != 0
                      ? tracks[index].album.images[1].url
                      : ""
                  }
                />
              </a>
            </Link>
          </Grid>
        )}
      />

      {hasNextPage && (
        <div className="fixed bottom-0 w-full flex justify-center">
          <button
            disabled
            className="animate-bounce my-1 px-5 py-2 bg-blue-600 bg-opacity-80 text-white font-bold rounded-full"
          >
            More
          </button>
        </div>
      )}
    </div>
  );
};

// TODO: SSR initial tracks
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );
//   const accessToken = session?.accessToken as string;
//   spotifyWebApi.setAccessToken(accessToken);

//   const res = await spotifyWebApi.search(context.query.query as string, [
//     "track",
//   ]);

//   return {
//     props: {
//       initialTracks: res.body.tracks,
//     },
//   };
// };

export default SearchTracks;
