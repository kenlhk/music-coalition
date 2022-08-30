import ArtistCard from "../../../components/artist/ArtistCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

it("should render", () => {
  const artistName = "John";
  render(<ArtistCard id={"1"} name={artistName} />);
  const john = screen.getByText("John");

  expect(john).toBeInTheDocument();
});
