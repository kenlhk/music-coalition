import { Button, Text } from "@nextui-org/react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdDataSaverOff, MdDataSaverOn } from "react-icons/md";

interface SaveButtonProps {
  saved?: boolean | false;
}

const SaveButton = (props: SaveButtonProps) => {
  const [saved, setSaved] = useState(props.saved);
  const router = useRouter();
  const trackId = router.query.trackId;
  const session = useSession();

  const handleSave = async () => {
    if (session.status === "authenticated") {
      if (saved) {
        await axios.delete("/api/user/tracks", { data: { trackId: trackId } });
      } else {
        await axios.put("/api/user/tracks", { trackId: trackId });
      }
      setSaved(!saved);
    } else {
      signIn();
    }
  };

  return (
    <Button
      icon={saved ? <MdDataSaverOff size={20} /> : <MdDataSaverOn size={20} />}
      bordered={!saved}
      onPress={() => handleSave()}
      color="gradient"
      className="z-0"
    >
      <Text>{saved ? "Unsave" : "Save"}</Text>
    </Button>
  );
};

export default SaveButton;
