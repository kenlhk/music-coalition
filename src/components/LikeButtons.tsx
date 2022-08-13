import { Button } from "@nextui-org/react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

interface LikeButtons {
  sourceType: string;
  sourceId: string;
  rating?: string;
}

const LikeButtons = (props: LikeButtons) => {
  const [rating, setRating] = useState(props.rating);
  const router = useRouter();
  const trackId = router.query.trackId;
  const session = useSession();

  const handleLike = async () => {
    if (session.status === "authenticated") {
      if (rating === "Like") {
        setRating("None");
        await axios.put("/api/track/rate", {
          sourceType: props.sourceType,
          sourceId: props.sourceId,
          rating: "None",
        });
      } else {
        setRating("Like");
        await axios.put("/api/track/rate", {
          sourceType: props.sourceType,
          sourceId: props.sourceId,
          rating: "Like",
        });
      }
    } else {
      signIn();
    }
  };

  const handleDislike = async () => {
    if (session.status === "authenticated") {
      if (rating === "Dislike") {
        setRating("None");
        await axios.put("/api/track/rate", {
          sourceType: props.sourceType,
          sourceId: props.sourceId,
          rating: "None",
        });
      } else {
        setRating("Dislike");
        await axios.put("/api/track/rate", {
          sourceType: props.sourceType,
          sourceId: props.sourceId,
          rating: "Dislike",
        });
      }
    } else {
      signIn();
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        color={"success"}
        shadow={rating === "Like"}
        bordered={rating === "None" || rating === "Dislike"}
        onPress={handleLike}
        auto
        css={{ minWidth: 150 }}
        icon={rating === "Like" ? <AiFillLike /> : <AiOutlineLike />}
      >
        Like
      </Button>
      <Button
        color={"error"}
        shadow={rating === "Dislike"}
        bordered={rating === "None" || rating === "Like"}
        onPress={handleDislike}
        auto
        css={{ minWidth: 150 }}
        icon={rating === "Dislike" ? <AiFillDislike /> : <AiOutlineDislike />}
      >
        Dislike
      </Button>
    </div>
  );
};

export default LikeButtons;
