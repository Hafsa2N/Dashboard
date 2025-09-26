'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer, type ChartConfig } from '@/components/ui/chart';
import { waitTimesByDepartment } from '@/lib/data';

const chartConfig = {
  'Wait Time': {
    label: 'Wait Time',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;


export function WaitTimesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Wait Times by Department</CardTitle>
        <CardDescription>Average wait time in minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waitTimesByDepartment} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="department"
                type="category"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="Wait Time" fill="var(--color-Wait Time)" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
