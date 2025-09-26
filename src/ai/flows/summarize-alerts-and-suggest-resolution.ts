'use server';

/**
 * @fileOverview Summarizes patient vitals alerts and suggests a potential resolution.
 *
 * - summarizeAlertsAndSuggestResolution - A function that handles the alert summarization and resolution suggestion process.
 * - SummarizeAlertsAndSuggestResolutionInput - The input type for the summarizeAlertsAndSuggestResolution function.
 * - SummarizeAlertsAndSuggestResolutionOutput - The return type for the summarizeAlertsAndSuggestResolution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAlertsAndSuggestResolutionInputSchema = z.object({
  vitalsReadings: z
    .string()
    .describe('The patient vitals readings, including heart rate, respiration rate, SpO2, and ECG.'),
  alertThresholds: z
    .string()
    .describe('The known alert thresholds for each vital reading.'),
});
export type SummarizeAlertsAndSuggestResolutionInput =
  z.infer<typeof SummarizeAlertsAndSuggestResolutionInputSchema>;

const SummarizeAlertsAndSuggestResolutionOutputSchema = z.object({
  summary: z.string().describe('A summary of the patient vitals alerts.'),
  suggestedResolution:
    z.string().describe('A suggested resolution for the alerts.'),
});
export type SummarizeAlertsAndSuggestResolutionOutput =
  z.infer<typeof SummarizeAlertsAndSuggestResolutionOutputSchema>;

export async function summarizeAlertsAndSuggestResolution(
  input: SummarizeAlertsAndSuggestResolutionInput
): Promise<SummarizeAlertsAndSuggestResolutionOutput> {
  return summarizeAlertsAndSuggestResolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAlertsAndSuggestResolutionPrompt',
  input: {schema: SummarizeAlertsAndSuggestResolutionInputSchema},
  output: {schema: SummarizeAlertsAndSuggestResolutionOutputSchema},
  prompt: `You are a doctor summarizing patient vitals alerts and suggesting a potential resolution.

Vitals Readings: {{{vitalsReadings}}}
Alert Thresholds: {{{alertThresholds}}}

Summarize the patient vitals alerts and suggest a potential resolution.

Summary: {{summary}}
Suggested Resolution: {{suggestedResolution}}`,
});

const summarizeAlertsAndSuggestResolutionFlow = ai.defineFlow(
  {
    name: 'summarizeAlertsAndSuggestResolutionFlow',
    inputSchema: SummarizeAlertsAndSuggestResolutionInputSchema,
    outputSchema: SummarizeAlertsAndSuggestResolutionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
