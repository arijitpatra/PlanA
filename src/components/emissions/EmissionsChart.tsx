import { AreaChart, XAxis, YAxis, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import type { AvgByProduct } from '../../api/emissions/getAvgByProduct'
import moment from 'moment'
import styled from 'styled-components'
import { useTheme } from '@material-ui/core/styles'
import type { Theme } from '@material-ui/core'
import { useMediaQuery } from 'react-responsive'
import dateFormat from '../../utils/getDateFormat'

const StyledTooltip = styled.div`
  background-color: white;
  padding: 0.4rem; 
  box-shadow: 10px 10px 31px -15px rgba(0,0,0,0.75);
  border-radius: 5px;
`

type EmissionsChartProps = {
  data: Array<AvgByProduct>
}

type CustomTooltipProps = {
  active?: boolean,
  payload?: any,
  label?: string
}

export const getTickXFormatted = (lenght: number, value: string): string => {
  const date = moment(value)
  if(lenght > 0 ) return date.format(dateFormat) 
  return ''
}

export const getTickYFormatted = (value: number): string => {
  return `${value.toFixed(2)} CO2`
}

export const getFormattedLegend = (value: string): string => {
  if(value === 'average') return 'Daily average CO2 emission'
  return ''
}

export const getInterval = (lenght: number, intervalFactor: number): number => {
  return Math.ceil(lenght / intervalFactor)
}

const EmissionsChart = ({ data }: EmissionsChartProps) => {
  const theme: Theme = useTheme();
  const isTabletOrMobile: boolean = useMediaQuery({ query: '(max-width: 768px)' })
  const intervalFactor: number = isTabletOrMobile ? 2.5 : 10

  return (
    <ResponsiveContainer width="95%">
      <AreaChart data={data} margin={{ top: 40, right: 30, left: isTabletOrMobile ? 15 : 40, bottom: 30 }}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
            <stop offset="75%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="start"
          tickLine={false}
          interval={getInterval(data.length, intervalFactor)}
          tickFormatter={value => getTickXFormatted(data.length, value)}
        />
        <YAxis 
          type="number" 
          domain={[0, 'dataMax']} 
          allowDecimals={false} 
          tickFormatter={getTickYFormatted}
        />
        <Tooltip content={CustomTooltip} />
        <Legend verticalAlign="top" height={80} formatter={getFormattedLegend} />
        <Area type="monotone" dataKey="average" stroke={theme.palette.primary.main} fill="url(#gradient)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if(active) return (
    <StyledTooltip>
      <div>{`Date: ${moment(label).format(dateFormat)}`}</div>
      {!!payload.lenght && <div>{`${payload[0].value} CO2`}</div>}
    </StyledTooltip>
  )
  return null
}
  
export default EmissionsChart