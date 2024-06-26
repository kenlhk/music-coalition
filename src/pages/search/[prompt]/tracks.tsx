import { Grid } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import SpotifyWebApi from "spotify-web-api-node";
import SearchLayout from "../../../components/common/SearchLayout";
import TrackCard from "../../../components/track/TrackCard";
import { getServerAccessToken, spotifyAxiosClient } from "../../../lib/spotify";

interface SearchTracksProps {
  accessToken: string;
  initialTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
}

const TrackSearch = (props: SearchTracksProps) => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const accessToken = props.accessToken;
  const client = new SpotifyWebApi();
  client.setAccessToken(accessToken);

  const fetcher = async ({ pageParam = "" }) => {
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

    const res = await client
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
    <div className="flex fixed left-0">
      <VirtuosoGrid
        style={{ height: "78vh", width: "100vw", overflowX: "hidden" }}
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
              <TrackCard track={tracks[index]} />
            </Grid>
          </div>
        )}
      />

      {/* {hasNextPage && <MoreButton />} */}
    </div>
  );
};

TrackSearch.getLayout = function getLayout(page: ReactNode) {
  return <SearchLayout>{page}</SearchLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getServerAccessToken();

  return {
    props: {
      accessToken: token.access_token,
    },
  };
};

export default TrackSearch;
