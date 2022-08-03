import { Grid } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import AlbumCard from "../../../components/album/AlbumCard";
import SearchLayout from "../../../components/common/SearchLayout";
import {
  getServerAccessToken,
  spotifyApiWrapper,
  spotifyAxiosClient
} from "../../../lib/spotify";

interface SearchAlbumProps {
  accessToken: string;
}

const AlbumSearch = (props: SearchAlbumProps) => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectFull[]>([]);
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
        .then((res) => res.data.albums);
      return res;
    }

    const res = await spotifyApiWrapper
      .search(prompt as string, ["album"], { limit: 30 })
      .then((res) => res.body.albums);

    return res;
  };

  const { isFetching, fetchNextPage, hasNextPage, error } = useInfiniteQuery(
    "albums",
    fetcher,
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.next;
      },
      enabled: router.isReady,
      cacheTime: 0,
      staleTime: 0,
      onSuccess: (data) =>
        updateAlbums(data?.pages.flatMap((page) => page.items)),
    }
  );

  const updateAlbums = (items: SpotifyApi.AlbumObjectFull[]) => {
    setAlbums(items);
  };

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
        totalCount={albums.length}
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
              <AlbumCard
                id={albums[index].id.toString()}
                name={albums[index].name}
                artistNames={albums[index].artists.map(
                  (artist: SpotifyApi.ArtistObjectSimplified) => artist.name
                )}
                cover={albums[index].images[1]?.url}
              />
            </Grid>
          </div>
        )}
      />

      {/* {hasNextPage && <MoreButton />} */}
    </div>
  );
};

AlbumSearch.getLayout = function getLayout(page: ReactNode) {
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

export default AlbumSearch;
