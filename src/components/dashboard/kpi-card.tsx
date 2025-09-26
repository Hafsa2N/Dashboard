import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Kpi } from '@/lib/types';

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
        <kpi.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{kpi.value}</div>
      </CardContent>
    </Card>
  );
}
