'use server';

import {
  summarizeAlertsAndSuggestResolution,
  type SummarizeAlertsAndSuggestResolutionInput,
  type SummarizeAlertsAndSuggestResolutionOutput,
} from '@/ai/flows/summarize-alerts-and-suggest-resolution';

export async function getAlertSummaryAction(
  input: SummarizeAlertsAndSuggestResolutionInput
): Promise<{ data: SummarizeAlertsAndSuggestResolutionOutput | null; error: string | null }> {
  try {
    const result = await summarizeAlertsAndSuggestResolution(input);
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { data: null, error: e.message || 'An unexpected error occurred.' };
  }
}
