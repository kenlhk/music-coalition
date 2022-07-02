import { Card, Col, Row, Text } from "@nextui-org/react";

interface Props {
  name: string;
  artist: string;
  cover: string;
}

const TrackCard = (props: Props) => {
  return (
    <Card css={{ w: "200px", h: "200px", p: 0 }} isPressable>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={props.cover}
          width="100%"
          height="100%"
          objectFit="cover"
          alt="Card example background"
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
          pt: "1%",
          pb: "1%",
        }}
      >
        <Row>
          <Col>
            <Text color="#FFF" size={"80%"} b>
              {props.name}
            </Text>
            <Text color="#FFF" size={"80%"}>
              {props.artist}
            </Text>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default TrackCard;
