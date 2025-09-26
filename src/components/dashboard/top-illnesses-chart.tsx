'use client';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent, ChartContainer, ChartLegendContent, ChartLegend } from '@/components/ui/chart';
import { topIllnesses } from '@/lib/data';

const chartConfig = {
  count: {
    label: 'Count',
  },
  ...topIllnesses.reduce((acc, cur) => {
    acc[cur.name] = { label: cur.name, color: `hsl(var(--chart-${Object.keys(acc).length + 1}))` };
    return acc;
  }, {}),
};

export function TopIllnessesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Top 5 Illnesses</CardTitle>
        <CardDescription>Distribution of most common diagnoses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={topIllnesses}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                strokeWidth={2}
              >
                {topIllnesses.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={`var(--color-${entry.name})`} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ right: -10 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
