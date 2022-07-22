import { Card, Image, Text } from "@nextui-org/react";

interface VideoCardProps {
  title: string;
  thumbnail?: string;
}

const VideoCard = (props: VideoCardProps) => {
  return (
    <Card isPressable isHoverable variant="bordered" css={{ mw: "400px" }}>
      <Card.Body>
        <Image src={props.thumbnail ? props.thumbnail : ""} />
        <Text h4>{props.title}</Text>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
