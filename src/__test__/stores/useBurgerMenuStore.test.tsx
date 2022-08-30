import { renderHook, act } from "@testing-library/react";
import useBurgerMenuStore from "../../stores/useBurgerMenuStore";

it("should open or close burger menu", () => {
  const { result } = renderHook(() => useBurgerMenuStore());

  expect(result.current.isOpen).toBe(false);

  act(() => {
    result.current.setOpen(true);
  });

  expect(result.current.isOpen).toBe(true);
});
