import { Grid } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { VirtuosoGrid } from "react-virtuoso";
import ArtistCard from "../../../components/ArtistCard";
import SearchLayout from "../../../components/common/SearchLayout";
import MoreButton from "../../../components/MoreButton";
import { spotifyApiWrapper, spotifyAxiosClient } from "../../../lib/spotify";

const ArtistSearch = () => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);

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
      React.forwardRef<HTMLDivElement>((props, ref) => {
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
              <Link
                href={{
                  pathname: "/artist/[artistId]",
                  query: {
                    artistId: artists[index].id,
                  },
                }}
              >
                <a>
                  <ArtistCard
                    key={index.toString()}
                    name={artists[index].name}
                    image={artists[index].images[1]?.url}
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

ArtistSearch.getLayout = function getLayout(page: ReactNode) {
  return <SearchLayout>{page}</SearchLayout>;
};

export default ArtistSearch;
