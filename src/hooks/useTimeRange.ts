import { useEffect, useState } from "react";
import dateFormat from "../utils/getDateFormat";

// TODO: call it useDateRange
export const useTimeRange = (data: any) => {
    const [startDate, setStartDate] = useState(data.begin.format(dateFormat));
    const [endDate, setEndDate] = useState(data.end.format(dateFormat));

    useEffect(() => {
        console.log(startDate, endDate)
        setStartDate(data.begin.format(dateFormat));
        setEndDate(data.end.format(dateFormat));
        sessionStorage.setItem("startDate", startDate);
        sessionStorage.setItem("endDate", endDate);
    }, [data]);

    return [startDate, endDate];
}