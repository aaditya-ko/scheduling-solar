"use client"
import { Chart, ChartContainer } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

interface ConfidenceIntervalChartProps {
  meanTime: number
  lowerBound: number
  upperBound: number
}

export function ConfidenceIntervalChart({ meanTime, lowerBound, upperBound }: ConfidenceIntervalChartProps) {
  // Generate data for the chart
  const data = Array.from({ length: 11 }, (_, i) => {
    const progress = i / 10
    return {
      progress,
      mean: meanTime,
      lower: lowerBound,
      upper: upperBound,
    }
  })

  return (
    <div className="w-full h-64">
      <Chart>
        <ChartContainer>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="progress"
              label={{ value: "Time Progress", position: "insideBottom", offset: -5 }}
              tickFormatter={(value) => `${value * 100}%`}
            />
            <YAxis
              label={{ value: "Hours", angle: -90, position: "insideLeft" }}
              domain={[Math.floor(lowerBound - 1), Math.ceil(upperBound + 1)]}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(1)} hours`, ""]}
              labelFormatter={(value) => `Progress: ${(Number(value) * 100).toFixed(0)}%`}
            />
            <Area
              type="monotone"
              dataKey="mean"
              stroke="#8884d8"
              strokeWidth={2}
              fill="url(#colorConfidence)"
              fillOpacity={0.3}
            />
            <Area type="monotone" dataKey="upper" stroke="none" fill="none" />
            <Area type="monotone" dataKey="lower" stroke="none" fill="none" />
            <Area type="monotone" dataKey="mean" stroke="#8884d8" strokeWidth={2} fill="none" />
          </AreaChart>
        </ChartContainer>
      </Chart>
    </div>
  )
}
