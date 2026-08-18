import { UserAuditAnswers, AuditResult, PillarScore } from '../types';

export function calculateLeadLeakageScore(answers: UserAuditAnswers): AuditResult {
  // Base default score components
  let speedScore = 50;
  let followUpScore = 45;
  let qualificationScore = 55;
  let appointmentScore = 48;
  let reactivationScore = 30;

  // 1. Response Time Impact on Speed-to-Lead
  if (answers.responseTime === 'under_1m') {
    speedScore = 96;
  } else if (answers.responseTime === '1_5m') {
    speedScore = 84;
  } else if (answers.responseTime === '5_15m') {
    speedScore = 56;
  } else if (answers.responseTime === '15_60m') {
    speedScore = 34;
  } else if (answers.responseTime === '1_4h') {
    speedScore = 18;
  } else if (answers.responseTime === '4h_plus') {
    speedScore = 9;
  } else if (answers.responseTime === 'not_sure') {
    speedScore = 20;
  }

  // 2. Follow-Up Method & Strategy
  if (answers.followUpMethod === 'automated') {
    followUpScore = 92;
  } else if (answers.followUpMethod === 'assistant') {
    followUpScore = 72;
  } else if (answers.followUpMethod === 'manual_self') {
    followUpScore = 42;
  } else if (answers.followUpMethod === 'sometimes') {
    followUpScore = 24;
  } else if (answers.followUpMethod === 'nothing') {
    followUpScore = 8;
  } else if (answers.followUpMethod === 'not_sure') {
    followUpScore = 18;
  }

  // Follow-Up Frequency Modifier
  if (answers.followUpFrequency === '10_plus') {
    followUpScore = Math.min(100, followUpScore + 18);
  } else if (answers.followUpFrequency === '6_10') {
    followUpScore = Math.min(100, followUpScore + 8);
  } else if (answers.followUpFrequency === '3_5') {
    // neutral
  } else if (answers.followUpFrequency === '1_2') {
    followUpScore = Math.max(10, followUpScore - 18);
  } else if (answers.followUpFrequency === '0') {
    followUpScore = Math.max(5, followUpScore - 30);
  }

  // 3. SMS Automation & Qualification
  if (answers.smsAutomation === 'yes') {
    speedScore = Math.min(99, speedScore + 10);
    followUpScore = Math.min(99, followUpScore + 10);
    qualificationScore = 82;
  } else if (answers.smsAutomation === 'no') {
    qualificationScore = 40;
    followUpScore = Math.max(12, followUpScore - 12);
  } else {
    qualificationScore = 52;
  }

  // 4. CRM Integration
  if (answers.crmUsage === 'yes') {
    qualificationScore = Math.min(98, qualificationScore + 14);
    appointmentScore = Math.min(95, appointmentScore + 10);
  } else if (answers.crmUsage === 'no') {
    qualificationScore = Math.max(15, qualificationScore - 25);
    appointmentScore = Math.max(15, appointmentScore - 20);
  } else {
    qualificationScore = Math.max(30, qualificationScore - 10);
  }

  // 5. Appointment Automation
  if (answers.appointmentAutomation === 'yes') {
    appointmentScore = 94;
  } else if (answers.appointmentAutomation === 'partially') {
    appointmentScore = 58;
  } else if (answers.appointmentAutomation === 'no') {
    appointmentScore = 24;
  } else {
    appointmentScore = 32;
  }

  // 6. Reactivation
  if (answers.reactivation === 'auto') {
    reactivationScore = 92;
  } else if (answers.reactivation === 'manual') {
    reactivationScore = 58;
  } else if (answers.reactivation === 'sometimes') {
    reactivationScore = 34;
  } else if (answers.reactivation === 'no') {
    reactivationScore = 12;
  } else {
    reactivationScore = 18;
  }

  // 7. Frustration Adjustments
  if (answers.biggestFrustration === 'slow_response') {
    speedScore = Math.max(12, speedScore - 15);
  } else if (answers.biggestFrustration === 'too_much_manual' || answers.biggestFrustration === 'not_enough_resp') {
    followUpScore = Math.max(12, followUpScore - 12);
  } else if (answers.biggestFrustration === 'unqualified') {
    qualificationScore = Math.max(15, qualificationScore - 15);
  } else if (answers.biggestFrustration === 'no_appointments') {
    appointmentScore = Math.max(14, appointmentScore - 18);
  } else if (answers.biggestFrustration === 'old_ignored') {
    reactivationScore = Math.max(8, reactivationScore - 15);
  }

  // Clamp all scores 5 - 98
  const clamp = (n: number) => Math.round(Math.max(6, Math.min(98, n)));
  speedScore = clamp(speedScore);
  followUpScore = clamp(followUpScore);
  qualificationScore = clamp(qualificationScore);
  appointmentScore = clamp(appointmentScore);
  reactivationScore = clamp(reactivationScore);

  // Overall Weighted Score
  // Weights: Speed (25%), FollowUp (30%), Qualification (15%), Appointment (15%), Reactivation (15%)
  const overallScore = Math.round(
    speedScore * 0.25 +
    followUpScore * 0.30 +
    qualificationScore * 0.15 +
    appointmentScore * 0.15 +
    reactivationScore * 0.15
  );

  // Determine Risk Category
  let riskLevel: 'HIGH LEAKAGE RISK' | 'MODERATE LEAKAGE' | 'SOME LEAKAGE' | 'EXCELLENT LEAD FLOW';
  let riskColor: string;
  let riskDescription: string;

  if (overallScore < 40) {
    riskLevel = 'HIGH LEAKAGE RISK';
    riskColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    riskDescription = 'Your current process has severe systemic drop-offs across response speed and persistent follow-up. A substantial percentage of your paid lead spend is dissolving before live appointments are booked.';
  } else if (overallScore < 60) {
    riskLevel = 'MODERATE LEAKAGE';
    riskColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    riskDescription = 'You have foundational lead systems in place, but manual friction and inconsistent touchpoints are causing qualified prospects to go cold or choose competing agents.';
  } else if (overallScore < 80) {
    riskLevel = 'SOME LEAKAGE';
    riskColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    riskDescription = 'Your lead process performs well above average, but key automation gaps in appointment handoffs or database re-engagement represent untapped transactions.';
  } else {
    riskLevel = 'EXCELLENT LEAD FLOW';
    riskColor = 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40';
    riskDescription = 'Your speed, persistent follow-up, and CRM infrastructure are elite. Fine-tuning AI qualification and high-converting reactivation can squeeze maximum ROI from your pipeline.';
  }

  const getStatus = (val: number): 'critical' | 'warning' | 'healthy' | 'optimal' => {
    if (val < 35) return 'critical';
    if (val < 65) return 'warning';
    if (val < 85) return 'healthy';
    return 'optimal';
  };

  const pillars: PillarScore[] = [
    {
      name: 'Speed-to-Lead',
      key: 'speedToLead',
      score: speedScore,
      industryAverage: 42,
      status: getStatus(speedScore),
      headline: speedScore < 50 ? 'Initial Response Delay' : 'Responsive Inbound Gateway',
      description: speedScore < 50
        ? 'Prospects who wait longer than 5 minutes to receive a response are 21x less likely to enter your active pipeline.'
        : 'Your initial response cadence captures leads while their intent and interest are at peak elevation.',
      recommendation: 'Deploy instant AI 2-way SMS verification within 45 seconds of every paid lead submission.',
    },
    {
      name: 'Follow-Up',
      key: 'followUp',
      score: followUpScore,
      industryAverage: 36,
      status: getStatus(followUpScore),
      headline: followUpScore < 50 ? 'Manual Follow-Up Dependency' : 'Systematic Touchpoint Cadence',
      description: followUpScore < 50
        ? 'Your current follow-up appears heavily reliant on manual memory between showings, causing early drop-offs on non-responsive leads.'
        : 'You maintain persistent multichannel touches that extract conversations from hesitant prospects.',
      recommendation: 'Implement an automated 14-day multi-channel nurture sequence (SMS + email + task prompts) that never quits after 1-2 attempts.',
    },
    {
      name: 'Lead Qualification',
      key: 'qualification',
      score: qualificationScore,
      industryAverage: 54,
      status: getStatus(qualificationScore),
      headline: qualificationScore < 50 ? 'Unfiltered Prospect Pipeline' : 'Structured Data & Tagging',
      description: qualificationScore < 50
        ? 'Valuable time is spent chasing unverified or non-serious inquiries without automated pre-screening criteria.'
        : 'Leads are tagged and filtered, allowing you to prioritize high-intent buyers and sellers.',
      recommendation: 'Use automated interactive qualification questions (timeline, pre-approval status, target price) before booking phone time.',
    },
    {
      name: 'Appointment Flow',
      key: 'appointmentFlow',
      score: appointmentScore,
      industryAverage: 48,
      status: getStatus(appointmentScore),
      headline: appointmentScore < 50 ? 'Friction in Calendar Booking' : 'Streamlined Booking Gateway',
      description: appointmentScore < 50
        ? 'Phone tag and manual scheduling delays create high drop-off between prospect interest and confirmed calendar slots.'
        : 'Qualified prospects can smoothly transition directly onto your calendar without back-and-forth friction.',
      recommendation: 'Integrate dynamic calendar scheduling directly inside automated SMS and messaging workflows with automated reminder sequences.',
    },
    {
      name: 'Lead Reactivation',
      key: 'reactivation',
      score: reactivationScore,
      industryAverage: 28,
      status: getStatus(reactivationScore),
      headline: reactivationScore < 50 ? 'Dormant Database Decay' : 'Active Re-Engagement Engine',
      description: reactivationScore < 50
        ? 'Past ad spend sits stagnant inside your CRM without regular systematic re-engagement triggers to uncover delayed moves.'
        : 'You extract recurring transactions from past leads whose life situations or timelines have shifted.',
      recommendation: 'Launch automated 9-word re-engagement campaigns to past CRM leads every 60–90 days to revive inactive prospects.',
    },
  ];

  // Sort to find the lowest and second lowest pillars (the biggest leaks)
  const sortedPillars = [...pillars].sort((a, b) => a.score - b.score);
  const biggestLeak = sortedPillars[0];
  const secondBiggestLeak = sortedPillars[1];

  // Lead volume multiplier estimation
  let monthlyLeads = 30;
  if (answers.leadVolume === '1-10') monthlyLeads = 8;
  else if (answers.leadVolume === '11-25') monthlyLeads = 18;
  else if (answers.leadVolume === '26-50') monthlyLeads = 38;
  else if (answers.leadVolume === '51-100') monthlyLeads = 75;
  else if (answers.leadVolume === '101-250') monthlyLeads = 175;
  else if (answers.leadVolume === '250+') monthlyLeads = 350;

  // Approximate opportunity calculation
  // With high leakage (score < 40), typically 60-70% of potential appointments are lost.
  // Average real estate commission (GCI) ~$9,000 per closed deal.
  const leakageRate = Math.max(0.15, (100 - overallScore) / 100 * 0.55);
  const potentialAppointments = Math.max(1, Math.round(monthlyLeads * 0.18)); // 18% benchmark
  const estimatedLostAppointments = Math.max(1, Math.round(potentialAppointments * leakageRate));
  const estimatedLostGCI = Math.round(estimatedLostAppointments * 0.25 * 9500 * 12); // annual lost GCI estimate

  // Specific tactical recommendations customized to their answers
  const specificTactics = [
    {
      title: `Fix Priority #1: ${biggestLeak.name}`,
      action: biggestLeak.recommendation,
      impact: 'Recovers an estimated 35–45% of previously lost prospect conversations.',
    },
    {
      title: `Fix Priority #2: ${secondBiggestLeak.name}`,
      action: secondBiggestLeak.recommendation,
      impact: 'Reduces manual agent administrative time by 6–10 hours per week.',
    },
    {
      title: 'Fix Priority #3: Database Reactivation Sprint',
      action: 'Run an automated 3-step reactivation sequence across your dormant CRM leads to surface immediate hot buyers/sellers without buying a single new lead.',
      impact: 'Typically generates 2–5 immediate appointment bookings in the first 7 days.',
    },
  ];

  return {
    overallScore,
    riskLevel,
    riskColor,
    riskDescription,
    pillars,
    biggestLeak,
    secondBiggestLeak,
    estimatedMonthlyLeads: monthlyLeads,
    estimatedLostAppointments,
    estimatedLostGCI,
    specificTactics,
    timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}
