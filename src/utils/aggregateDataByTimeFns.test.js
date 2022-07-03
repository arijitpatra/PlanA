import {
  yearRange,
  data,
  yearlyData,
  quarterlyData,
  monthlyData,
} from "./testData";
import {
  calcYearlyData,
  calcQuarterlyData,
  calcMonthlyData,
} from "./aggregateDataByTimeFns";

test("calculate yearly data correctly", () => {
  expect(calcYearlyData(yearRange, data)).toStrictEqual(yearlyData);
});

test("calculate quarterly data correctly", () => {
  expect(calcQuarterlyData(yearRange, data)).toStrictEqual(quarterlyData);
});

test("calculate monthly data correctly", () => {
  expect(calcMonthlyData(yearRange, data)).toStrictEqual(monthlyData);
});
