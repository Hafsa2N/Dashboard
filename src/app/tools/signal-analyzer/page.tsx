import { SignalAnalyzer } from '@/components/tools/signal-analyzer';

export default function SignalAnalyzerPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold">CSV Signal Analyzer</h1>
        <p className="text-muted-foreground">
          Upload a CSV file with biomedical data (HR, RESP, SpO₂) to analyze it.
        </p>
      </div>
      <SignalAnalyzer />
    </div>
  );
}
