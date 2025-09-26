import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Patient } from '@/lib/types';
import Image from 'next/image';

const statusVariant = {
  Admitted: 'default',
  Waiting: 'secondary',
  Discharged: 'outline',
} as const;

export function PatientProfile({ patient }: { patient: Patient }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={patient.avatar}
            width={64}
            height={64}
            alt={patient.name}
            className="rounded-full"
            data-ai-hint="person portrait"
          />
          <div>
            <CardTitle className="text-3xl font-headline">{patient.name}</CardTitle>
            <p className="text-muted-foreground">
              {patient.age} years old, {patient.gender}
            </p>
          </div>
          <Badge variant={statusVariant[patient.status]} className="ml-auto text-sm">
            {patient.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="font-semibold">Diagnosed Illness</p>
          <p>{patient.illness}</p>
        </div>
        <div>
          <p className="font-semibold">Department</p>
          <p>{patient.department}</p>
        </div>
        <div>
          <p className="font-semibold">Admission Date</p>
          <p>{patient.admissionDate}</p>
        </div>
        <div>
          <p className="font-semibold">Check-in Time</p>
          <p>{patient.checkInTime}</p>
        </div>
      </CardContent>
    </Card>
  );
}
