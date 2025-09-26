'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WandSparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { getAlertSummaryAction } from '@/app/actions';
import type { SummarizeAlertsAndSuggestResolutionOutput } from '@/ai/flows/summarize-alerts-and-suggest-resolution';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  vitalsReadings: z.string().min(10, 'Please provide more detailed vitals readings.'),
  alertThresholds: z.string().min(10, 'Please provide more detailed alert thresholds.'),
});

const defaultVitals = `Heart Rate: 135 bpm (regular rhythm)
Respiration Rate: 28 breaths/min
SpO2: 91% on room air
ECG: Sinus Tachycardia`;

const defaultThresholds = `Heart Rate > 100 bpm or < 60 bpm
Respiration Rate > 20 breaths/min
SpO2 < 94%`;


export function AlertSummarizerForm() {
  const [result, setResult] = useState<SummarizeAlertsAndSuggestResolutionOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vitalsReadings: defaultVitals,
      alertThresholds: defaultThresholds,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setResult(null);
    const { data, error } = await getAlertSummaryAction(values);
    if (error) {
      setError(error);
    } else {
      setResult(data);
    }
    setIsLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analyze Vitals</CardTitle>
          <CardDescription>Enter patient vitals and alert thresholds to get an AI-powered summary and resolution suggestion.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="vitalsReadings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vitals Readings</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Heart Rate: 135 bpm..." rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alertThresholds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alert Thresholds</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Heart Rate > 100 bpm..." rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  'Analyzing...'
                ) : (
                  <>
                    <WandSparkles className="mr-2 h-4 w-4" />
                    Generate Summary
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Summary & Suggestion</CardTitle>
          <CardDescription>The generated analysis will appear below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading && (
            <div className="space-y-4">
                <div>
                    <Skeleton className="h-6 w-1/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                </div>
                <div>
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5 mt-1" />
                </div>
            </div>
          )}
          {error && <div className="text-destructive bg-destructive/10 p-4 rounded-md">{error}</div>}
          {result && !isLoading && (
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-lg mb-2">Summary</h3>
                <p className="bg-secondary/50 p-4 rounded-md whitespace-pre-wrap">{result.summary}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Suggested Resolution</h3>
                <p className="bg-secondary/50 p-4 rounded-md whitespace-pre-wrap">{result.suggestedResolution}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
