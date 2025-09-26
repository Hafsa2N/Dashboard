'use client';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';

interface VitalsChartProps {
  data: { time: string; value: number }[];
  title: string;
  color: string;
  unit: string;
}

export function VitalsChart({ data, title, color, unit }: VitalsChartProps) {
  const lastValue = data[data.length - 1]?.value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-2xl font-bold">
          {lastValue} <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </CardHeader>
      <CardContent className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Tooltip
              content={<ChartTooltipContent indicator="line" hideLabel />}
            />
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="value"
              stroke={color}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
