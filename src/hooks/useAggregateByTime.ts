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
    // const quarterlyData = [];
    // let yearAndQtrCount = {};

    // const d = data.filter(
    //   (item: { start: string; end: string }) =>
    //     +item.start.slice(5, 7) % 3 === 0
    // );

    // const qData = [];
    // for (let y = yearRangeLimits[0]; y <= yearRangeLimits[1]; y++) {
    //   const q1 = d.find(
    //     (item: { start: string; end: string }) =>
    //       item.start.slice(0, 4) === y.toString() &&
    //       item.start.slice(5, 7) === "03"
    //   );
    //   const q2 = d.find(
    //     (item: { start: string; end: string }) =>
    //       item.start.slice(0, 4) === y.toString() &&
    //       item.start.slice(5, 7) === "06"
    //   );
    //   const q3 = d.find(
    //     (item: { start: string; end: string }) =>
    //       item.start.slice(0, 4) === y.toString() &&
    //       item.start.slice(5, 7) === "09"
    //   );
    //   const q4 = d.find(
    //     (item: { start: string; end: string }) =>
    //       item.start.slice(0, 4) === y.toString() &&
    //       item.start.slice(5, 7) === "12"
    //   );

    //   if (q1 !== undefined) qData.push(q1);
    //   if (q2 !== undefined) qData.push(q2);
    //   if (q3 !== undefined) qData.push(q3);
    //   if (q4 !== undefined) qData.push(q4);

    //   console.log(qData);
    // }
    // setAggregatedData(qData);
    /*****QUARTERLY******/




        /*****MONTHLY******/
        const quarterlyData = [];
        let yearAndQtrCount = {};
    
    
        const qData = [];
        for (let y = yearRangeLimits[0]; y <= yearRangeLimits[1]; y++) {
          const m1 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "01"
          );
          const m2 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "02"
          );
          const m3 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "03"
          );
          const m4 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "04"
          );
          const m5 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "05"
          );
          const m6 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "06"
          );
          const m7 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "07"
          );
          const m8 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "08"
          );
          const m9 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "09"
          );
          const m10 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "10"
          );
          const m11 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "11"
          );
          const m12 = data.find(
            (item: { start: string; end: string }) =>
              item.start.slice(0, 4) === y.toString() &&
              item.start.slice(5, 7) === "12"
          );

    
          if (m1 !== undefined) qData.push(m1);
          if (m2 !== undefined) qData.push(m2);
          if (m3 !== undefined) qData.push(m3);
          if (m4 !== undefined) qData.push(m4);
          if (m5 !== undefined) qData.push(m5);
          if (m6 !== undefined) qData.push(m6);
          if (m7 !== undefined) qData.push(m7);
          if (m8 !== undefined) qData.push(m8);
          if (m9 !== undefined) qData.push(m9);
          if (m10 !== undefined) qData.push(m10);
          if (m11 !== undefined) qData.push(m11);
          if (m12 !== undefined) qData.push(m12);
    
          console.log(qData);
        }
        setAggregatedData(qData);
        /*****MONTHLY******/



  }, [data]);

  return [isLoading, aggregatedData];
};
