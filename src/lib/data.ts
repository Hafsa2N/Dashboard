import type { Patient, ChartData, WaitTimeData, IllnessData } from './types';
import { subDays, format } from 'date-fns';

const illnesses = ['Influenza', 'Pneumonia', 'Asthma', 'Myocardial Infarction', 'Migraine', 'Appendicitis', 'COVID-19'];
const departments = ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'General'] as const;
const patientNames = ['John Smith', 'Emily Johnson', 'Michael Williams', 'Sarah Brown', 'David Jones', 'Jessica Garcia', 'Daniel Miller', 'Linda Davis', 'James Rodriguez', 'Patricia Martinez'];

const generateRandomVital = (base: number, variation: number, length: number) => {
  return Array.from({ length }, (_, i) => ({
    time: `T${String(i).padStart(2, '0')}:00`,
    value: Math.round(base + (Math.random() - 0.5) * variation),
  }));
};

const generateEcgData = (length: number) => {
  const data = [];
  const p = 0.1, q = 0.2, r = 0.3, s = 0.4, t = 0.6, cycle = 1.0;
  for (let i = 0; i < length; i++) {
    const x = (i % (cycle * 100)) / 100;
    let y = 0;
    if (x >= p-0.05 && x <= p+0.05) y = 0.2 * Math.exp(-Math.pow((x - p) / 0.02, 2));
    else if (x >= q-0.02 && x <= q+0.02) y = -0.3 * Math.exp(-Math.pow((x-q)/0.01,2));
    else if (x >= r-0.02 && x <= r+0.02) y = 1.5 * Math.exp(-Math.pow((x-r)/0.01,2));
    else if (x >= s-0.02 && x <= s+0.02) y = -0.4 * Math.exp(-Math.pow((x-s)/0.01,2));
    else if (x >= t-0.05 && x <= t+0.05) y = 0.4 * Math.exp(-Math.pow((x - t) / 0.03, 2));
    y += (Math.random() - 0.5) * 0.05;
    data.push({ time: `T${String(i).padStart(2, '0')}:00`, value: y });
  }
  return data;
};

export const patients: Patient[] = Array.from({ length: 10 }, (_, i) => {
  const checkIn = new Date();
  checkIn.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  const seen = Math.random() > 0.3;
  const doctorSeen = seen ? new Date(checkIn.getTime() + Math.random() * 60 * 60 * 1000) : null;
  
  return {
    id: `${i + 1}`,
    name: patientNames[i],
    avatar: `https://picsum.photos/seed/${i + 10}/40/40`,
    age: Math.floor(Math.random() * 60) + 20,
    gender: Math.random() > 0.5 ? 'Female' : 'Male',
    illness: illnesses[Math.floor(Math.random() * illnesses.length)],
    admissionDate: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd'),
    department: departments[Math.floor(Math.random() * departments.length)],
    status: seen ? (Math.random() > 0.5 ? 'Admitted' : 'Discharged') : 'Waiting',
    checkInTime: format(checkIn, 'HH:mm'),
    doctorSeenTime: doctorSeen ? format(doctorSeen, 'HH:mm') : null,
    vitals: {
      hr: generateRandomVital(80, 20, 50),
      resp: generateRandomVital(18, 5, 50),
      spo2: generateRandomVital(98, 2, 50),
      ecg: generateEcgData(200),
    },
    alerts: Math.random() > 0.5 ? [{
      id: `alert-${i}-1`,
      vital: 'HR',
      message: 'Heart rate is above threshold',
      timestamp: format(new Date(), 'HH:mm'),
      priority: 'High',
    }] : [],
  };
});

export const getWaitTime = (patient: Patient) => {
  if (!patient.doctorSeenTime) return null;
  const [checkInH, checkInM] = patient.checkInTime.split(':').map(Number);
  const [seenH, seenM] = patient.doctorSeenTime.split(':').map(Number);
  let diff = (seenH * 60 + seenM) - (checkInH * 60 + checkInM);
  if (diff < 0) diff += 24 * 60; // Handles overnight waits
  return diff;
};

const validWaitTimes = patients.map(getWaitTime).filter(t => t !== null) as number[];
export const averageWaitTime = validWaitTimes.length > 0
  ? Math.round(validWaitTimes.reduce((a, b) => a + b, 0) / validWaitTimes.length)
  : 0;

export const illnessCounts = patients.reduce((acc, patient) => {
  acc[patient.illness] = (acc[patient.illness] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

export const mostCommonIllness = Object.entries(illnessCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
export const totalAdmissionsToday = patients.filter(p => p.admissionDate === format(new Date(), 'yyyy-MM-dd')).length;
export const activeAlerts = patients.reduce((acc, p) => acc + p.alerts.length, 0);

export const admissionsTrendData: ChartData[] = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), i);
  return {
    date: format(date, 'MMM d'),
    admissions: Math.floor(Math.random() * 15) + 5,
  };
}).reverse();

export const waitTimesByDepartment: WaitTimeData[] = departments.map(dep => ({
  department: dep,
  'Wait Time': Math.floor(Math.random() * 45) + 15,
}));

export const topIllnesses: IllnessData[] = Object.entries(illnessCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const populationInsights = [
    { illness: 'Asthma', vital: 'RESP', threshold: 20, percentage: 35 },
    { illness: 'Myocardial Infarction', vital: 'HR', threshold: 100, percentage: 62 },
    { illness: 'Pneumonia', vital: 'SpO2', threshold: 92, percentage: 48 },
];
