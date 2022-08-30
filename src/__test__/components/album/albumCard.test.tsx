import AlbumCard from "../../../components/album/AlbumCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

it("should render", () => {
  const album = "The album";
  const artistName = ["John"];
  render(<AlbumCard id={"1"} name={album} artistNames={artistName} />);
  const john = screen.getByText("John");
  const albumTitle = screen.getByText("The album");

  expect(john).toBeInTheDocument();
  expect(albumTitle).toBeInTheDocument();
});
