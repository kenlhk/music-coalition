import { renderHook, act } from "@testing-library/react";
import useSpotifyStore from "../../stores/useSpotifyStore";

it("stores the access token", () => {
  const { result } = renderHook(() => useSpotifyStore());

  expect(result.current.accessToken).toBe(null);

  const accessToken = {
    access_token: "abc",
    token_type: "jwt",
    expires_in: 1234,
    scope: "user",
  };

  act(() => {
    result.current.setAccessToken(accessToken);
  });

  expect(result.current.accessToken).toBe(accessToken);
});
