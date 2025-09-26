'use client';
import * as React from 'react';
import { Label, Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
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
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { topIllnesses } from '@/lib/data';

const chartData = topIllnesses.map((illness) => ({
    name: illness.name,
    count: illness.count,
    fill: `var(--color-${illness.name.toLowerCase().replace(/ /g, '-')})`,
}));

const chartConfig = topIllnesses.reduce((acc, illness, index) => {
    acc[illness.name.toLowerCase().replace(/ /g, '-')] = {
      label: illness.name,
      color: `hsl(var(--chart-${index + 1}))`,
    };
    return acc;
}, {});

const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);

export function TopIllnessesChart() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline">Top 5 Illnesses</CardTitle>
        <CardDescription>Distribution of most common diagnoses</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
            innerRadius={80}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
            <RadialBar dataKey="count" background>
                <Label
                    content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                        <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                            >
                            {totalCount.toLocaleString()}
                            </tspan>
                            <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-muted-foreground"
                            >
                            Total
                            </tspan>
                        </text>
                        );
                    }
                    }}
                />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total admissions for the top 5 illnesses
        </div>
      </CardFooter>
    </Card>
  );
}
