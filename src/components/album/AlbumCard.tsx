import { Card, Col, Row, Text } from "@nextui-org/react";
import Link from "next/link";

interface AlbumCardProps {
  id: string;
  name: string;
  artistNames: string[];
  cover?: string;
}

const AlbumCard = (props: AlbumCardProps) => {
  const artists = props.artistNames.join(", ");

  return (
    <div className="w-40 md:w-full">
      <Link
        href={{
          pathname: "/album/[albumId]",
          query: {
            albumId: props.id,
          },
        }}
      >
        <a>
          <Card css={{ border: "none" }} isPressable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={props.cover || ""}
                objectFit="cover"
                alt="Album cover"
                height={"180px"}
                width={"180px"}
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
                    {props.name}
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

export default AlbumCard;
