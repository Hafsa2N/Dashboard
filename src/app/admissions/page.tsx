import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { patients, getWaitTime } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const statusVariant = {
  Admitted: 'default',
  Waiting: 'secondary',
  Discharged: 'outline',
} as const;

export default function AdmissionsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">All Admissions</CardTitle>
        <CardDescription>A complete list of all patient admissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Illness</TableHead>
              <TableHead>Wait Time</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => {
              const waitTime = getWaitTime(patient);
              return (
                <TableRow key={patient.id}>
                  <TableCell>
                    <Link href={`/patients/${patient.id}`} className="flex items-center gap-3 group">
                      <Image
                        src={patient.avatar}
                        width={40}
                        height={40}
                        alt={patient.name}
                        className="rounded-full"
                        data-ai-hint="person portrait"
                      />
                      <div className="font-medium group-hover:underline">{patient.name}</div>
                    </Link>
                  </TableCell>
                  <TableCell>{patient.department}</TableCell>
                  <TableCell>{patient.illness}</TableCell>
                  <TableCell>{waitTime !== null ? `${waitTime} min` : 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[patient.status]}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
