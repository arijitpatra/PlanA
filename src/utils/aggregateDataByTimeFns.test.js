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

test("calculates yearly data correctly:", () => {
  expect(calcYearlyData(yearRange, data)).toStrictEqual(yearlyData);
});

test("calculates quarterly data correctly:", () => {
  expect(calcQuarterlyData(yearRange, data)).toStrictEqual(quarterlyData);
});

test("calculates monthly data correctly:", () => {
  expect(calcMonthlyData(yearRange, data)).toStrictEqual(monthlyData);
});
