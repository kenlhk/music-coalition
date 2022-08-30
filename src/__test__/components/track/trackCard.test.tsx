import TrackCard from "../../../components/track/TrackCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

it("should render", () => {
  const trackName = "My Song";
  const artistName = ["John"];
  render(<TrackCard name={trackName} artistNames={artistName}/>);
  const button = screen.getByRole("button");
  const song = screen.getByText("My Song");
  const john = screen.getByText("John")

  expect(button).toBeInTheDocument();
  expect(song).toBeInTheDocument();
  expect(john).toBeInTheDocument();
});
