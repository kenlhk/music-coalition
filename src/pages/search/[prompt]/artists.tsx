import { Grid } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import ArtistCard from "../../../components/ArtistCard";
import SearchLayout from "../../../components/common/SearchLayout";
import MoreButton from "../../../components/MoreButton";
import {
  getServerAccessToken,
  spotifyApiWrapper,
  spotifyAxiosClient,
} from "../../../lib/spotify";

interface SearchArtistsProps {
  accessToken: string;
  initialTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
}

const ArtistSearch = (props: SearchArtistsProps) => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
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
        .then((res) => res.data.artists);
      return res;
    }

    const res = await spotifyApiWrapper
      .search(prompt as string, ["artist"], { limit: 30 })
      .then((res) => res.body.artists);

    return res;
  };

  const { fetchNextPage, hasNextPage, error } = useInfiniteQuery(
    "artists",
    fetcher,
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.next;
      },
      enabled: router.isReady,
      cacheTime: 0,
      staleTime: 0,
      onSuccess: (data) => {
        updateArtists(data?.pages.flatMap((page) => page.items));
      },
    }
  );

  const updateArtists = (items: SpotifyApi.ArtistObjectFull[]) => {
    setArtists(items);
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
        style={{ height: "78vh", overflowX: "hidden" }}
        totalCount={artists.length}
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
              <ArtistCard
                id={artists[index].id.toString()}
                name={artists[index].name}
                image={artists[index].images[1]?.url}
              />
            </Grid>
          </div>
        )}
      />

      {hasNextPage && <MoreButton />}
    </div>
  );
};

ArtistSearch.getLayout = function getLayout(page: ReactNode) {
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

export default ArtistSearch;
