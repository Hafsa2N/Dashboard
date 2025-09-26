export type Patient = {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  illness: string;
  admissionDate: string;
  department: 'Cardiology' | 'Neurology' | 'Oncology' | 'Pediatrics' | 'General';
  status: 'Admitted' | 'Waiting' | 'Discharged';
  checkInTime: string;
  doctorSeenTime: string | null;
  vitals: {
    hr: { time: string; value: number }[];
    resp: { time: string; value: number }[];
    spo2: { time: string; value: number }[];
    ecg: { time: string; value: number }[];
  };
  alerts: {
    id: string;
    vital: 'HR' | 'RESP' | 'SpO2' | 'ECG';
    message: string;
    timestamp: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
};

export type Kpi = {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type ChartData = {
  date: string;
  admissions: number;
};

export type WaitTimeData = {
  department: string;
  'Wait Time': number;
};

export type IllnessData = {
  name: string;
  count: number;
};
