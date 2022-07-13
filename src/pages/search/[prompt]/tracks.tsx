import { Button, Loading, Progress, Spinner, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import TrackList from "../../../components/TrackList";
import { queryClient } from "../../../lib/react-query";
import { spotifyApiClient, spotifyWebApi } from "../../../lib/spotify";
import { authOptions } from "../../api/auth/[...nextauth]";

interface searchTracksProps {
  initialTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
}

const SearchTracks = (props: searchTracksProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const prompt = router.query.prompt;
  const [ref, inView] = useInView();

  const fetcher = async ({ pageParam = "" }) => {
    const accessToken = session?.accessToken;
    spotifyWebApi.setAccessToken(accessToken!);
    spotifyApiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;

    if (pageParam !== "") {
      const res = await spotifyApiClient
        .get(pageParam)
        .then((res) => res.data.tracks);
      return res;
    }

    const res = await spotifyWebApi
      .search(prompt as string, ["track"], { limit: 25 })
      .then((res) => res.body.tracks);

    return res;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery("tracks", fetcher, {
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.next;
      },
      enabled: status === "authenticated" && router.isReady,
      cacheTime: 0,
    });

  useEffect(() => {
    if (inView && status === "authenticated" && router.isReady && hasNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div>
      <Text h1>Tracks</Text>
      {isLoading ? (
        <Progress
          indeterminated
          value={50}
          color="primary"
          status="primary"
          size={"sm"}
        />
      ) : (
        <div>
          <TrackList tracks={data?.pages.flatMap((page) => page.items)} />
          <div ref={ref} />
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
