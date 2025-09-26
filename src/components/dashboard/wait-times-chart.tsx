'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';
import { waitTimesByDepartment } from '@/lib/data';

export function WaitTimesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Wait Times by Department</CardTitle>
        <CardDescription>Average wait time in minutes</CardDescription>
      </CardHeader>
      <CardContent>
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
            <Bar dataKey="Wait Time" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
