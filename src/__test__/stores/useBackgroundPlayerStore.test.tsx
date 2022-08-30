import { renderHook, act } from "@testing-library/react";
import useBackgroundPlayerStore from "../../stores/useBackgroundPlayerStore";

it("shows the state of background player", () => {
  const { result } = renderHook(() => useBackgroundPlayerStore());

  expect(result.current.url).toBe("");
  expect(result.current.playing).toBe(false);
  expect(result.current.auto).toBe(false);

  act(() => {
    result.current.setUrl("abc");
    result.current.setPlaying(true);
    result.current.setAuto(true);
  });

  expect(result.current.url).toBe("abc");
  expect(result.current.playing).toBe(true);
  expect(result.current.auto).toBe(true);
});
