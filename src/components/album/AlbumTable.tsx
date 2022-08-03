import { Table } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";

interface AlbumTableProps {
  tracks: SpotifyApi.TrackObjectSimplified[];
}

type Selection = "all" | Set<React.Key>;

const AlbumTable = (props: AlbumTableProps) => {
  const router = useRouter();

  return (
    <Table
      aria-label="Album tracks"
      selectionMode="single"
      css={{
        width: "60vw",
        height: "auto",
      }}
      onSelectionChange={(keys: Selection) => {
        if (keys !== "all") {
          router.push(`/track/${keys.values().next().value}`);
        }
      }}
      bordered
    >
      <Table.Header>
        <Table.Column>#</Table.Column>
        <Table.Column>TITLE</Table.Column>
        <Table.Column>ARTIST</Table.Column>
        <Table.Column>LENGTH</Table.Column>
      </Table.Header>
      <Table.Body>
        {props.tracks.map((track, index) => {
          const time = new Date();
          time.setTime(track.duration_ms);
          return (
            <Table.Row key={track.id}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{track.name}</Table.Cell>
              <Table.Cell>
                {track.artists.map((artist) => artist.name).join(", ")}
              </Table.Cell>
              <Table.Cell>
                {time.getMinutes()}:
                {time.getSeconds().toString().padStart(2, "0")}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default AlbumTable;
