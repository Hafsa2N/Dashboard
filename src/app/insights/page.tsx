import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { populationInsights } from "@/lib/data";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">Population Insights</h1>
        <p className="text-muted-foreground">
          Aggregate biosignal patterns by illness type.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {populationInsights.map((insight) => (
          <Card key={insight.illness}>
            <CardHeader>
              <CardTitle className="font-headline">{insight.illness}</CardTitle>
              <CardDescription>
                Patients with abnormal {insight.vital} rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-muted-foreground">
                  {insight.vital} &gt; {insight.threshold}
                </p>
                <p className="text-2xl font-bold">{insight.percentage}%</p>
              </div>
              <Progress value={insight.percentage} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
