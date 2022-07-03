import type { AvgByProduct } from "../api/emissions/getAvgByProduct";

type dataObject = {
  start: string;
  end: string;
  average: number;
};

const isYearsMatching = (dataObject: dataObject, year: number) => {
  return dataObject.start.slice(0, 4) === year.toString();
};

const getMonth = (dataObject: dataObject) => dataObject.start.slice(5, 7);

// TODO - think of optimization
export const calcYearlyData = (
  yearRangeLimits: number[],
  data: AvgByProduct[]
) => {
  const yearlyData: AvgByProduct[] | undefined = [];

  for (let y = yearRangeLimits[0]; y <= +yearRangeLimits[1]; y++) {
    const filteredData = data.find((item: dataObject) =>
      isYearsMatching(item, y)
    );
    if (filteredData !== undefined) {
      yearlyData.push(filteredData);
    }
  }

  return yearlyData;
};

// TODO - think of optimization
export const calcQuarterlyData = (
  yearRangeLimits: number[],
  data: AvgByProduct[]
) => {
  const filteredData = data.filter(
    (item: dataObject) => +getMonth(item) % 3 === 0
  );

  const quarterlyData: AvgByProduct[] | undefined = [];

  for (let y = +yearRangeLimits[0]; y <= +yearRangeLimits[1]; y++) {
    const q1 = filteredData.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "03"
    );
    const q2 = filteredData.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "06"
    );
    const q3 = filteredData.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "09"
    );
    const q4 = filteredData.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "12"
    );

    [q1, q2, q3, q4].forEach((quarter) => {
      if (quarter !== undefined) quarterlyData.push(quarter);
    });
  }

  return quarterlyData;
};

// TODO - think of optimization
export const calcMonthlyData = (
  yearRangeLimits: number[],
  data: AvgByProduct[]
) => {
  const monthlyData: AvgByProduct[] | undefined = [];

  for (let y = +yearRangeLimits[0]; y <= +yearRangeLimits[1]; y++) {
    const m1 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "01"
    );
    const m2 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "02"
    );
    const m3 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "03"
    );
    const m4 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "04"
    );
    const m5 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "05"
    );
    const m6 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "06"
    );
    const m7 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "07"
    );
    const m8 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "08"
    );
    const m9 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "09"
    );
    const m10 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "10"
    );
    const m11 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "11"
    );
    const m12 = data.find(
      (item: dataObject) => isYearsMatching(item, y) && getMonth(item) === "12"
    );

    [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12].forEach((month) => {
      if (month !== undefined) monthlyData.push(month);
    });
  }

  return monthlyData;
};
