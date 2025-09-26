import { patients } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PatientProfile } from '@/components/patient/patient-profile';
import { VitalsChart } from '@/components/patient/vitals-chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertTriangle, HeartPulse, Wind, Activity } from 'lucide-react';

// This is a custom icon since lucide doesn't have a direct spo2 icon
const Spo2Icon = (props: { className?: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a9.75 9.75 0 0 0-8.75 4.89L2 12h10l-1.42-5.11A9.75 9.75 0 0 0 12 2Z" />
    <path d="m22 12-1.25-5.11A9.75 9.75 0 0 0 12 2v10h10Z" />
  </svg>
);


export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PatientProfile patient={patient} />

      <div>
        <h2 className="text-2xl font-headline font-semibold mb-4">Biosignal Trends</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <VitalsChart data={patient.vitals.hr} title="Heart Rate" color="hsl(var(--chart-1))" unit="BPM" />
            <VitalsChart data={patient.vitals.resp} title="Respiration" color="hsl(var(--chart-2))" unit="BPM" />
            <VitalsChart data={patient.vitals.spo2} title="SpO₂" color="hsl(var(--chart-4))" unit="%" />
            <VitalsChart data={patient.vitals.ecg} title="ECG" color="hsl(var(--chart-5))" unit="mV" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-semibold mb-4">Active Alerts</h2>
        <Card>
          <CardContent className="pt-6">
            {patient.alerts.length > 0 ? (
              <ul className="space-y-4">
                {patient.alerts.map((alert) => (
                  <li key={alert.id} className="flex items-start gap-4">
                    <div className="p-2 bg-destructive/10 rounded-full">
                       <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {alert.vital} Alert - Priority: {alert.priority}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {alert.message} at {alert.timestamp}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No active alerts for this patient.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
