'use client';
import { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, FileWarning, BarChart } from 'lucide-react';
import { VitalsChart } from '@/components/patient/vitals-chart';

type CsvData = {
  time: string;
  hr: number;
  resp: number;
  spo2: number;
};

type AnalysisMetrics = {
  meanHR: number;
  sdnn: number;
  rmssd: number;
  avgResp: number;
  spo2Min: number;
  spo2Max: number;
  spo2Trend: 'Stable' | 'Increasing' | 'Decreasing';
};

const parseCSV = (csvText: string): CsvData[] => {
  const lines = csvText.trim().split('\n');
  const headerLine = lines[0].split(',').map(h => h.trim());
  const headerMapping: {[key: string]: string} = {
    'Time [s]': 'time',
    'II': 'hr',
    'PLETH': 'spo2',
    'RESP': 'resp'
  };
  
  const mappedHeaders = headerLine.map(h => headerMapping[h] || h);

  const data: CsvData[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length !== mappedHeaders.length) continue;
    const entry: any = {};
    mappedHeaders.forEach((header, index) => {
      entry[header] = header === 'time' ? values[index] : parseFloat(values[index]);
    });
    data.push(entry as CsvData);
  }
  return data;
};

const analyzeData = (data: CsvData[]): AnalysisMetrics => {
  const hrValues = data.map(d => d.hr).filter(v => !isNaN(v));
  const respValues = data.map(d => d.resp).filter(v => !isNaN(v));
  const spo2Values = data.map(d => d.spo2).filter(v => !isNaN(v));

  const mean = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  
  const meanHR = mean(hrValues);
  
  const sdnn = hrValues.length > 0 ? Math.sqrt(hrValues.map(x => Math.pow(x - meanHR, 2)).reduce((a, b) => a + b) / hrValues.length) : 0;
  
  const diffs = [];
  if (hrValues.length > 1) {
    for (let i = 1; i < hrValues.length; i++) {
      diffs.push(Math.pow(hrValues[i] - hrValues[i-1], 2));
    }
  }
  const rmssd = diffs.length > 0 ? Math.sqrt(mean(diffs)) : 0;

  const avgResp = mean(respValues);
  
  const spo2Min = spo2Values.length > 0 ? Math.min(...spo2Values) : 0;
  const spo2Max = spo2Values.length > 0 ? Math.max(...spo2Values) : 0;
  
  let spo2Trend: 'Stable' | 'Increasing' | 'Decreasing' = 'Stable';
  if (spo2Values.length > 1) {
    const firstHalfSpo2 = mean(spo2Values.slice(0, Math.floor(spo2Values.length / 2)));
    const secondHalfSpo2 = mean(spo2Values.slice(Math.ceil(spo2Values.length / 2)));
    if (secondHalfSpo2 > firstHalfSpo2 + 0.5) spo2Trend = 'Increasing';
    if (secondHalfSpo2 < firstHalfSpo2 - 0.5) spo2Trend = 'Decreasing';
  }


  return {
    meanHR: parseFloat(meanHR.toFixed(2)),
    sdnn: parseFloat(sdnn.toFixed(2)),
    rmssd: parseFloat(rmssd.toFixed(2)),
    avgResp: parseFloat(avgResp.toFixed(2)),
    spo2Min,
    spo2Max,
    spo2Trend
  };
};


export function SignalAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CsvData[] | null>(null);
  const [metrics, setMetrics] = useState<AnalysisMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setData(null);
      setMetrics(null);
      setError(null);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      if (parsedData.length === 0 || !('hr' in parsedData[0]) || !('resp' in parsedData[0]) || !('spo2' in parsedData[0])) {
        throw new Error('Invalid CSV format. Please ensure headers are Time [s], RESP, PLETH, and II.');
      }
      const analysisMetrics = analyzeData(parsedData);
      setData(parsedData);
      setMetrics(analysisMetrics);
    } catch (err: any) {
      setError(err.message || 'Failed to process file.');
      setData(null);
      setMetrics(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV</CardTitle>
            <CardDescription>Select a CSV file to begin analysis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="file" accept=".csv" onChange={handleFileChange} />
            <Button onClick={handleFileUpload} disabled={!file || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Signal Data
                </>
              )}
            </Button>
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-md">
                <FileWarning className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        {isLoading && (
          <Card>
            <CardContent className="p-6 flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        )}
        
        {data && metrics ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Metrics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Mean HR (from II)</p>
                  <p className="text-2xl font-bold">{metrics.meanHR} <span className="text-sm font-normal"></span></p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">SDNN</p>
                  <p className="text-2xl font-bold">{metrics.sdnn} <span className="text-sm font-normal">ms</span></p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">RMSSD</p>
                  <p className="text-2xl font-bold">{metrics.rmssd} <span className="text-sm font-normal">ms</span></p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Resp Rate</p>
                  <p className="text-2xl font-bold">{metrics.avgResp} <span className="text-sm font-normal">/min</span></p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">SpO₂ Min/Max (from PLETH)</p>
                  <p className="text-2xl font-bold">{metrics.spo2Min}% - {metrics.spo2Max}%</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">SpO₂ Trend</p>
                  <p className="text-2xl font-bold">{metrics.spo2Trend}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <VitalsChart data={data.map(d => ({time: d.time, value: d.hr}))} title="Heart Rate (from II)" color="hsl(var(--chart-1))" unit="" />
              <VitalsChart data={data.map(d => ({time: d.time, value: d.resp}))} title="Respiration" color="hsl(var(--chart-2))" unit="BPM" />
              <VitalsChart data={data.map(d => ({time: d.time, value: d.spo2}))} title="SpO₂ (from PLETH)" color="hsl(var(--chart-4))" unit="%" />
            </div>
          </div>
        ) : (
          !isLoading && (
            <Card>
              <CardContent className="p-6 flex flex-col justify-center items-center h-64 text-center">
                 <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">No Data to Display</h3>
                <p className="text-muted-foreground">Upload a CSV file to see the analysis.</p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
