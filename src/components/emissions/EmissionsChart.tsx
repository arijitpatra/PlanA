import { useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import type { AvgByProduct } from "../../api/emissions/getAvgByProduct";
import { useAggregateByTime } from "../../hooks/useAggregateByTime";
import moment from "moment";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import dateFormat from "../../utils/getDateFormat";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../tabPanel/TabPanel";

const StyledTooltip = styled.div`
  background-color: white;
  padding: 0.4rem;
  box-shadow: 10px 10px 31px -15px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
`;

type EmissionsChartProps = {
  data: Array<AvgByProduct>;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

export const getInterval = (lenght: number, intervalFactor: number): number => {
  return Math.ceil(lenght / intervalFactor);
};

export const getTickXFormatted = (
  length: number,
  value: string,
  idx: number
): string => {
  const date = moment(value);

  if (length > 0) {
    // TODO: make it one object
    switch (idx) {
      case 0:
        return date.format("YYYY");
      case 1:
        return "Q" + date.format("Q YYYY");
      case 2:
        return date.format("MMM YYYY");
      default:
        return date.format(dateFormat);
    }
  }
  return "";
};

export const getTickYFormatted = (value: number): string => {
  return `${value.toFixed(2)} CO2`;
};

export const getFormattedLegend = (value: string, idx: number): string => {
  let duration = "Daily";

  // TODO: make it one object
  switch (idx) {
    case 0:
      duration = "Yearly";
      break;
    case 1:
      duration = "Quarterly";
      break;
    case 2:
      duration = "Monthly";
      break;
  }
  if (value === "average") return `${duration} average CO2 emission`;
  return "";
};

const a11yProps = (index: any) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const EmissionsChart = ({ data }: EmissionsChartProps) => {
  const [value, setValue] = useState(0);
  const aggregatedData = useAggregateByTime(data, value);
  const theme: Theme = useTheme();
  const isTabletOrMobile: boolean = useMediaQuery({
    query: "(max-width: 768px)",
  });
  // if aggregatedData.length is more than some threshold then maybe limit it
  const intervalFactor: number = isTabletOrMobile ? 2.5 : 0;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const getTab = (idx: number) => (
    <ResponsiveContainer aspect={isTabletOrMobile ? 1.33 : 2.5}>
      <AreaChart
        data={aggregatedData}
        margin={{
          top: 40,
          right: 30,
          left: isTabletOrMobile ? 15 : 40,
          bottom: 30,
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.8}
            />
            <stop
              offset="75%"
              stopColor={theme.palette.primary.main}
              stopOpacity={0.2}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="start"
          tickLine={false}
          interval={intervalFactor}
          tickFormatter={(value) =>
            getTickXFormatted(aggregatedData.length, value, idx)
          }
          dy={20}
          angle={45}
        />
        <YAxis
          type="number"
          domain={[0, "dataMax"]}
          allowDecimals={false}
          tickFormatter={getTickYFormatted}
        />
        <Tooltip content={CustomTooltip} />
        <Legend
          verticalAlign="top"
          height={80}
          formatter={(value) => getFormattedLegend(value, idx)}
        />
        <Area
          type="monotone"
          dataKey="average"
          stroke={theme.palette.primary.main}
          fill="url(#gradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div style={{ width: "75%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="aggregate data by time"
        centered
      >
        <Tab label="Yearly" {...a11yProps(0)} />
        <Tab label="Quarterly" {...a11yProps(1)} />
        <Tab label="Monthly" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {getTab(0)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {getTab(1)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {getTab(2)}
      </TabPanel>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active)
    return (
      <StyledTooltip>
        <div>{`Date: ${moment(label).format(dateFormat)}`}</div>
        {!!payload.length && <div>{`${payload[0].value} CO2`}</div>}
      </StyledTooltip>
    );
  return null;
};

export default EmissionsChart;
