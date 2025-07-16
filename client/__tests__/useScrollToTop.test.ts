import { renderHook } from "@testing-library/react";
import { useScrollToTop } from "../src/hooks/useScrollToTop";
import { vi } from "vitest";

window.scrollTo = vi.fn();

it("scrolls to top on initial render", () => {
  renderHook(() => useScrollToTop(1));
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
});

it("scrolls to top on page change", () => {
  renderHook(({ page }) => useScrollToTop(page), { initialProps: { page: 1 } });
  expect(window.scrollTo).toHaveBeenCalled();
});
