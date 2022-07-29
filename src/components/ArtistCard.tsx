import { Card, Col, Row, Text } from "@nextui-org/react";
import Link from "next/link";

interface ArtistCardProps {
  id: string;
  name: string;
  image?: string;
}

const ArtistCard = (props: ArtistCardProps) => {
  return (
    <div className="w-40 md:w-full">
      <Link
        href={{
          pathname: "/artist/[artistId]",
          query: {
            artistId: props.id,
          },
        }}
      >
        <a>
          <Card css={{ border: "none" }} isPressable>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={props.image || "/Avatar_Placeholder.png"}
                objectFit="cover"
                alt="Artist image"
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
                    size={"100%"}
                  >
                    {props.name}
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

export default ArtistCard;
