import { useEffect, useState } from "react";
import { useTimeRange } from "./useTimeRange";

export const useAggregateByTime = (data: any, idx: number) => {
    const [aggregatedData, setAggregatedData] = useState(data);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const s = sessionStorage.getItem("startDate");
        const e = sessionStorage.getItem("endDate");

        const yearRangeLimits = [+`${s?.slice(0, 4)}` , +`${e?.slice(0, 4)}`];
        console.log(yearRangeLimits)

        // TODO: check s < e | 2021 < 2022
        const yearlyData = [];
        for(let y = yearRangeLimits[0]; y <= yearRangeLimits[1]; y++) {
            const d = data.find((item: { start: string; end: string }) => item.start.slice(0,4) === y.toString());
            if(d !== undefined) {
                yearlyData.push(d);
            }
        }

        console.log(yearlyData);

        setAggregatedData(yearlyData);
        
    }, [data])

    return [isLoading, aggregatedData];
}