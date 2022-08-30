import SpotifyLoginButton from "../../../components/auth/SpotifyLoginButton";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

it("should render", () => {
  const artistName = "John";
  render(<SpotifyLoginButton accessToken="abc" />);
  const login = screen.getByText("Spotify Connected");

  expect(login).toBeInTheDocument();
});
