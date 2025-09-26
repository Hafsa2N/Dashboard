'use client';
import * as React from 'react';
import { Pie, PieChart, Cell } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { topIllnesses } from '@/lib/data';

const chartData = topIllnesses;

const chartConfig = topIllnesses.reduce((acc, illness, index) => {
    acc[illness.name] = {
      label: illness.name,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
  }, {});


export function TopIllnessesChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline">Top 5 Illnesses</CardTitle>
        <CardDescription>Distribution of most common diagnoses</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              innerRadius={50}
              strokeWidth={5}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartConfig[entry.name]?.color} />
                ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
