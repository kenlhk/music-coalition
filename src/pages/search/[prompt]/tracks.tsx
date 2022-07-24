import { Grid } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import SearchLayout from "../../../components/common/SearchLayout";
import MoreButton from "../../../components/MoreButton";
import TrackCard from "../../../components/TrackCard";
import {
  getServerAccessToken,
  spotifyApiWrapper,
  spotifyAxiosClient,
} from "../../../lib/spotify";

interface searchTracksProps {
  accessToken: string;
  initialTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
}

const TrackSearch = (props: searchTracksProps) => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const accessToken = props.accessToken;

  const fetcher = async ({ pageParam = "" }) => {
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
      .search(prompt as string, ["track"], { limit: 30 })
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
        updateTracks(data?.pages.flatMap((page) => page.items)),
    }
  );

  const updateTracks = (items: SpotifyApi.TrackObjectFull[]) => {
    setTracks(items);
  };

  if (error) {
    console.log(error);
  }

  const List = useMemo(
    () =>
      React.forwardRef<HTMLDivElement>(function List(props, ref) {
        return (
          <Grid.Container {...props} ref={ref} gap={0.5} justify={"center"} />
        );
      }),
    []
  );

  return (
    <div>
      <VirtuosoGrid
        style={{ height: "77vh", overflowX: "hidden" }}
        totalCount={tracks.length}
        endReached={() => {
          fetchNextPage();
        }}
        components={{
          Item: Grid,
          List: List,
        }}
        itemContent={(index) => (
          <div>
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
                    cover={tracks[index].album?.images[1]?.url}
                  />
                </a>
              </Link>
            </Grid>
          </div>
        )}
      />

      {hasNextPage && <MoreButton />}
    </div>
  );
};

TrackSearch.getLayout = function getLayout(page: ReactNode) {
  return <SearchLayout>{page}</SearchLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await getServerAccessToken();

  return {
    props: {
      accessToken: accessToken,
    },
  };
};

export default TrackSearch;
