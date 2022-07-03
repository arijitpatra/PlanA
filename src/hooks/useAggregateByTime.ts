import { useEffect, useState } from "react";
import type { AvgByProduct } from "../api/emissions/getAvgByProduct";
import { calcMonthlyData, calcQuarterlyData, calcYearlyData } from "../utils/aggregateDataByTimeFns";

// aggregates graph data by time
export const useAggregateByTime = (data: AvgByProduct[], idx: number) => {
  const [aggregatedData, setAggregatedData] = useState(data);

  useEffect(() => {
    const startDate = sessionStorage.getItem("startDate");
    const endDate = sessionStorage.getItem("endDate");
    const yearRangeLimits = [+`${startDate?.slice(0, 4)}`, +`${endDate?.slice(0, 4)}`];

    /*****YEARLY******/
    const yearly = calcYearlyData(yearRangeLimits, data);
    if (idx === 0) setAggregatedData(yearly);
    /*****YEARLY******/

    /*****QUARTERLY******/
    const quarterly = calcQuarterlyData(yearRangeLimits, data);
    if (idx === 1) setAggregatedData(quarterly);
    /*****QUARTERLY******/

    /*****MONTHLY******/
    const monthly = calcMonthlyData(yearRangeLimits, data);
    if (idx === 2) setAggregatedData(monthly);
    /*****MONTHLY******/

  }, [data, idx]);

  return { aggregatedData,setAggregatedData };
};
