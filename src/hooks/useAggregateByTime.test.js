import { renderHook, act } from "@testing-library/react-hooks";
import { useAggregateByTime } from "./useAggregateByTime";
import { data, yearlyData } from "../utils/testData";

test("should aggregate by time (year)", () => {
  const { result } = renderHook(() => useAggregateByTime(data, 0));
  act(() => {
    result.current.setAggregatedData(yearlyData);
  });
  expect(result.current.aggregatedData).toBe(yearlyData);
});
