# **App Name**: Bio vision Dashboard

## Core Features:

- Admissions Tracking: Record and display patient admission details including department, timestamps, and status.
- Wait Time Monitoring: Track patient check-in and doctor-seen times to calculate and display wait durations. Due to no back-end, it doesn't have to auto calculate.
- Dashboard KPIs: Display key performance indicators (KPIs) such as total admissions, average wait time, and most common illness.
- Admissions Trend Chart: Visualize admissions data over time using interactive charts.
- Wait Times Chart: Display wait times by department using chart visualizations.
- Alert summaries: Tool that reasons about vitals readings and known alert thresholds, to summarize those alerts and give a short suggestion for resolving them.
- Top cards: total admissions today, average wait time, most common illness, active alerts.
- Charts: admissions trend (30 days), wait times by department, top 5 illnesses.
- Patient detail view: profile info, illness diagnosed, linked biosignal trend charts (HR, RESP, SpO₂, ECG), alerts.
- Population insights: aggregate biosignal patterns by illness type (e.g., % asthma patients with abnormal RESP).

## Style Guidelines:

- Primary color: Deep sky blue (#00BFFF) for a calm and trustworthy feel, and associations with cleanliness.
- Background color: Light sky blue (#B0E2FF), slightly desaturated from the primary, to provide a gentle and airy backdrop.
- Accent color: Light green (#90EE90), analogous to the primary but different enough to highlight key interactive elements and alerts.
- Font pairing: 'Poppins' (sans-serif) for headlines, providing a contemporary and fashionable feel, paired with 'PT Sans' (sans-serif) for body text to maintain readability.
- Use a set of modern, line-style icons for all major UI elements, focusing on clarity and immediate recognizability.
- Implement a clean, card-based layout with clear visual hierarchy, using white space to create focus and reduce clutter.
- Use subtle transition animations to provide feedback on user interactions and guide the user through the interface.