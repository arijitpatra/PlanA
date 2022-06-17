import { useEffect, useState } from "react";
import type { AvgByProduct } from "../api/emissions/getAvgByProduct";
import { calcMonthlyData, calcQuarterlyData, calcYearlyData } from "../utils/aggregateDataByTimeFns";

export const useAggregateByTime = (data: any, idx: number) => {
  const [aggregatedData, setAggregatedData] = useState(data);

  useEffect(() => {
    const s = sessionStorage.getItem("startDate");
    const e = sessionStorage.getItem("endDate");

    const yearRangeLimits = [+`${s?.slice(0, 4)}`, +`${e?.slice(0, 4)}`];

    /*****YEARLY******/
    const y = calcYearlyData(yearRangeLimits, data);

    if (idx === 0) setAggregatedData(y);
    /*****YEARLY******/

    /*****QUARTERLY******/
    const q = calcQuarterlyData(yearRangeLimits, data);

    if (idx === 1) setAggregatedData(q);
    /*****QUARTERLY******/

    /*****MONTHLY******/
    const m = calcMonthlyData(yearRangeLimits, data);

    if (idx === 2) setAggregatedData(m);
    /*****MONTHLY******/
  }, [data, idx]);

  return {aggregatedData,setAggregatedData};
};
