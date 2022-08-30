import { renderHook, act } from "@testing-library/react";
import useLoadingStore from "../../stores/useLoadingStore";

it("should the app loading or not", () => {
  const { result } = renderHook(() => useLoadingStore());

  expect(result.current.isLoading).toBe(false);

  act(() => {
    result.current.setLoading(true);
  });

  expect(result.current.isLoading).toBe(true);
});
