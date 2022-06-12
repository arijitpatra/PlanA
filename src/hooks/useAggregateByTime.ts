import { useEffect, useState } from "react";
import { useTimeRange } from "./useTimeRange";

export const useAggregateByTime = (data: any, idx: number) => {
  const [aggregatedData, setAggregatedData] = useState(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const s = sessionStorage.getItem("startDate");
    const e = sessionStorage.getItem("endDate");

    const yearRangeLimits = [+`${s?.slice(0, 4)}`, +`${e?.slice(0, 4)}`];
    console.log(yearRangeLimits);

    /*****YEARLY******/
    // TODO: check s < e | 2021 < 2022
    // const yearlyData = [];
    // for(let y = yearRangeLimits[0]; y <= yearRangeLimits[1]; y++) {
    //     const d = data.find((item: { start: string; end: string }) => item.start.slice(0,4) === y.toString());
    //     if(d !== undefined) {
    //         yearlyData.push(d);
    //     }
    // }

    // console.log(yearlyData);

    // setAggregatedData(yearlyData);
    /*****YEARLY******/

    /*****QUARTERLY******/
    const quarterlyData = [];
    let yearAndQtrCount = {};

    const d = data.filter(
      (item: { start: string; end: string }) =>
        +item.start.slice(5, 7) % 3 === 0
    );

    const qData = [];
    for (let y = yearRangeLimits[0]; y <= yearRangeLimits[1]; y++) {
      const q1 = d.find(
        (item: { start: string; end: string }) =>
          item.start.slice(0, 4) === y.toString() &&
          item.start.slice(5, 7) === "03"
      );
      const q2 = d.find(
        (item: { start: string; end: string }) =>
          item.start.slice(0, 4) === y.toString() &&
          item.start.slice(5, 7) === "06"
      );
      const q3 = d.find(
        (item: { start: string; end: string }) =>
          item.start.slice(0, 4) === y.toString() &&
          item.start.slice(5, 7) === "09"
      );
      const q4 = d.find(
        (item: { start: string; end: string }) =>
          item.start.slice(0, 4) === y.toString() &&
          item.start.slice(5, 7) === "12"
      );

      if (q1 !== undefined) qData.push(q1);
      if (q2 !== undefined) qData.push(q2);
      if (q3 !== undefined) qData.push(q3);
      if (q4 !== undefined) qData.push(q4);

      console.log(qData);
    }
    setAggregatedData(qData);
    /*****QUARTERLY******/


    
  }, [data]);

  return [isLoading, aggregatedData];
};
