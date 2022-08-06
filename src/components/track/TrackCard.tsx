import { Card, Col, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import useBackgroundPlayerStore from "../../stores/useBackgroundPlayerStore";

interface TrackCardProps {
  track: SpotifyApi.TrackObjectFull;
  height?: string;
  width?: string;
}

const TrackCard = (props: TrackCardProps) => {
  const artists = props.track.artists.map((artist) => artist.name).join(", ");
  const { auto, setUrl, setPlaying } = useBackgroundPlayerStore();

  const handleMouseEnter = () => {
    if (auto) {
      setPlaying(true);
      setUrl(props.track.preview_url);
    }
  };

  const handleMouseLeave = () => {
    if (auto) {
      setPlaying(false);
      setUrl(null);
    }
  };

  return (
    <div className="w-40 md:w-full">
      <Link
        href={{
          pathname: "/track/[trackId]",
          query: {
            trackId: props.track.id,
          },
        }}
      >
        <a>
          <Card
            css={{ border: "none" }}
            isPressable
            isHoverable
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={props.track.album.images[1].url || ""}
                objectFit="cover"
                alt="Album cover"
                height={props.height || "180px"}
                width={props.width || "180px"}
              />
            </Card.Body>
            <Card.Footer
              isBlurred
              css={{
                position: "absolute",
                bgBlur: "#0f111466",
                bottom: 0,
                zIndex: 1,
                pl: "5%",
                pt: "0%",
                pb: "1%",
              }}
            >
              <Row>
                <Col>
                  <Text
                    className="font-bold truncate"
                    color="#FFF"
                    size={"80%"}
                  >
                    {props.track.name}
                  </Text>
                  <Text className="truncate" color="#FFF" size={"70%"}>
                    {artists}
                  </Text>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </a>
      </Link>
    </div>
  );
};

export default TrackCard;
