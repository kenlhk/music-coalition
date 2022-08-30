import VideoCard from "../../components/VideoCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

it("should render", () => {
  const video = "The Video";
  render(<VideoCard title={video} />);
  const title = screen.getByText("The Video")

  expect(title).toBeInTheDocument();
});
