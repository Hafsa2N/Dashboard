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
import { patients } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const statusVariant = {
  Admitted: 'default',
  Waiting: 'secondary',
  Discharged: 'outline',
} as const;

export function RecentAdmissions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle className="font-headline">Admissions</CardTitle>
            <CardDescription>Recent patient admissions.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/admissions">
                View All
                <ArrowUpRight className="h-4 w-4" />
            </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.slice(0, 5).map((patient) => (
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
                <TableCell className="text-right">
                  <Badge variant={statusVariant[patient.status]}>
                    {patient.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
