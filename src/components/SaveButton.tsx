import { Button, Text } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdDataSaverOff, MdDataSaverOn } from "react-icons/md";

const SaveButton = () => {
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const trackId = router.query.trackId;
  const session = useSession();

  useEffect(() => {
    const checkSaved = async () => {
      const res = await axios.get("/api/user/tracks");
      const savedTracks = res.data;
      setSaved(savedTracks.includes(trackId));
    };
    if (session.status === "authenticated") {
      checkSaved();
    }
  }, []);

  const handleSave = async () => {
    if (session.status === "authenticated") {
      if (saved) {
        await axios.delete("/api/user/tracks", { data: { trackId: trackId } });
      } else {
        await axios.put("/api/user/tracks", { trackId: trackId });
      }
      setSaved(!saved);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <Button
      icon={saved ? <MdDataSaverOff size={20} /> : <MdDataSaverOn size={20} />}
      bordered={!saved}
      onPress={() => handleSave()}
      color="gradient"
    >
      <Text>{saved ? "Unsave" : "Save"}</Text>
    </Button>
  );
};

export default SaveButton;
