import { Hospital, Clock, Bug, AlertTriangle } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/kpi-card';
import { AdmissionsChart } from '@/components/dashboard/admissions-chart';
import { WaitTimesChart } from '@/components/dashboard/wait-times-chart';
import { TopIllnessesChart } from '@/components/dashboard/top-illnesses-chart';
import { RecentAdmissions } from '@/components/dashboard/recent-admissions';
import { totalAdmissionsToday, averageWaitTime, mostCommonIllness, activeAlerts } from '@/lib/data';

export default function DashboardPage() {
  const kpis = [
    { label: 'Total Admissions Today', value: String(totalAdmissionsToday), icon: Hospital },
    { label: 'Average Wait Time', value: `${averageWaitTime} min`, icon: Clock },
    { label: 'Most Common Illness', value: mostCommonIllness, icon: Bug },
    { label: 'Active Alerts', value: String(activeAlerts), icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <AdmissionsChart />
        </div>
        <div className="lg:col-span-3">
          <WaitTimesChart />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RecentAdmissions />
        </div>
        <div className="lg:col-span-3">
          <TopIllnessesChart />
        </div>
      </div>
    </div>
  );
}
