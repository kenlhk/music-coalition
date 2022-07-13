import { Card, Col, Row, Text } from "@nextui-org/react";

interface TrackCardProps {
  key: string;
  name: string;
  artistNames: string[];
  cover: string;
}

const TrackCard = (props: TrackCardProps) => {
  const artists = props.artistNames.join(", ");

  return (
    <Card css={{ w: "200px", h: "200px", p: 0 }} isPressable>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={props.cover}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Album cover"
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
            <Text className="font-bold truncate" color="#FFF" size={"80%"}>
              {props.name}
            </Text>
            <Text className="truncate" color="#FFF" size={"70%"}>
              {artists}
            </Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default TrackCard;