import { Progress, Text } from "@nextui-org/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import TrackList from "../../../components/TrackList";
import {
  serverAccessToken,
  spotifyApiWrapper,
  spotifyAxiosClient,
} from "../../../lib/spotify";

interface searchTracksProps {
  serverAccessToken: string;
  initialTracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
}

const SearchTracks = (props: searchTracksProps) => {
  const router = useRouter();
  const prompt = router.query.prompt;
  const [ref, inView] = useInView();

  const fetcher = async ({ pageParam = "" }) => {
    const serverAccessToken = props.serverAccessToken;
    spotifyApiWrapper.setAccessToken(serverAccessToken);

    if (pageParam !== "") {
      const res = await spotifyAxiosClient
        .get(pageParam, {
          headers: {
            Authorization: `Bearer ${serverAccessToken}`,
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

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isFetching,
    error,
  } = useInfiniteQuery("tracks", fetcher, {
    getNextPageParam: (lastPage) => {
      return lastPage?.next;
    },
    enabled: router.isReady,
    cacheTime: 0,
    staleTime: 0,
  });

  const allItems = data?.pages.flatMap((page) => page.items);

  if (inView && router.isReady && hasNextPage) {
    fetchNextPage();
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      <Text h1 className="pl-5">
        Tracks
      </Text>
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
          <TrackList tracks={allItems} />
          <div ref={ref} />
        </div>
      )}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const accessToken = await serverAccessToken;
  return {
    props: {
      serverAccessToken: accessToken,
    },
  };
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
