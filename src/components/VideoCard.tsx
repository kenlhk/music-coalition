import { Card, Image, Text } from "@nextui-org/react";

interface VideoCardProps {
  title: string;
  thumbnail?: string;
}

const VideoCard = (props: VideoCardProps) => {
  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      borderWeight="bold"
      css={{
        minWidth: "200px",
        minHeight: "200px",
        mw: "300px",
        mh: "250px",
        borderRadius: "1em",
      }}
    >
      <Card.Body css={{ p: 1 }}>
        <div className="flex flex-col items-center overflow-hidden">
          <Image src={props.thumbnail ? props.thumbnail : ""} alt="Thumbnail" />
          <Text css={{ p: 5 }} h5>
            {props.title}
          </Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VideoCard;
