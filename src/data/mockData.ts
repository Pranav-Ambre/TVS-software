import type { Application, EcosystemCluster, VerificationTask, SimulationScenario } from '../types/eeris';

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'APP-78287',
    applicantName: 'Sunita Verma',
    individualRisk: 31,
    individualRiskLevel: 'Low',
    ecosystemRisk: 84,
    ecosystemRiskLevel: 'High',
    novelty: 0.92,
    ecosystem: 'ECO-1024',
    appliedAmount: '₹2,40,000',
    submittedTime: '3.2 hours ago',
    caseId: '8849-0192-A',
    rail: 'Auto Loan Underwriting Rail • Regional Cluster North',
    maturityState: 'Stage 3',
    coordinatedPattern: 'Coordinated Pattern',
    topDrivers: [
      {
        id: 'driver-1',
        title: 'Shared Device',
        contributionPercent: 22,
        riskLevel: 'High',
        details: 'IMEI 863920194827 is associated with 8 loan applications across 3 geographic PIN codes within 48 hours.',
        tags: ['Hardware Signature Match', 'Cluster #CL-901']
      },
      {
        id: 'driver-2',
        title: 'Dealer Concentration',
        contributionPercent: 18,
        riskLevel: 'High',
        details: 'Apex Retailers has a 4.2x velocity spike in first-time buyer applications.',
        tags: ['Merchant Velocity Anomaly'],
        metaKey: 'POS-ID:',
        metaValue: '44021'
      },
      {
        id: 'driver-3',
        title: 'Guarantor Reuse',
        contributionPercent: 14,
        riskLevel: 'Medium',
        details: 'Guarantor R. Sharma (PAN: ABCPS****) co-signed 5 pending loans without declared familial relation.',
        tags: ['Cross-Entity Link', 'Unrelated Co-sign']
      }
    ],
    recommendedAction: {
      badge: 'TARGETED VERIFICATION',
      title: 'Recommended Action',
      text: 'Borrower shows clean individual bureau history, but shares telemetry signatures with 6 delinquent accounts financed via Apex Auto. Require in-person biometric verification.',
      targetAppId: 'APP-78287'
    }
  },
  {
    id: 'APP-78291',
    applicantName: 'Rajesh Kumar',
    individualRisk: 24,
    individualRiskLevel: 'Low',
    ecosystemRisk: 42,
    ecosystemRiskLevel: 'Low',
    novelty: 0.31,
    ecosystem: 'ECO-1011',
    appliedAmount: '₹1,80,000',
    submittedTime: '4.5 hours ago',
    caseId: '8849-0195-B',
    rail: 'Consumer Durable Rail • Regional Cluster West',
    maturityState: 'Stage 1',
    coordinatedPattern: 'Low Network Density',
    topDrivers: [
      {
        id: 'driver-201',
        title: 'First-time Bureau',
        contributionPercent: 12,
        riskLevel: 'Low',
        details: 'Limited thin-file history, verified via bank statement.',
        tags: ['Thin File']
      }
    ],
    recommendedAction: {
      badge: 'STANDARD APPROVAL',
      title: 'Standard Review',
      text: 'Individual and ecosystem risk profiles remain low. Proceed with standard verification.',
      targetAppId: 'APP-78291'
    }
  },
  {
    id: 'APP-78304',
    applicantName: 'Vikram Malhotra',
    individualRisk: 62,
    individualRiskLevel: 'Medium',
    ecosystemRisk: 78,
    ecosystemRiskLevel: 'High',
    novelty: 0.81,
    ecosystem: 'ECO-1024',
    appliedAmount: '₹3,50,000',
    submittedTime: '5.1 hours ago',
    caseId: '8849-0201-C',
    rail: 'Auto Loan Underwriting Rail • Regional Cluster North',
    maturityState: 'Stage 3',
    coordinatedPattern: 'Coordinated Pattern',
    topDrivers: [
      {
        id: 'driver-301',
        title: 'Shared Hardware Signature',
        contributionPercent: 25,
        riskLevel: 'High',
        details: 'Device ID associated with ECO-1024 cluster.',
        tags: ['Device Collision']
      }
    ],
    recommendedAction: {
      badge: 'TARGETED VERIFICATION',
      title: 'Recommended Action',
      text: 'Shared device telemetry with ECO-1024. In-person verification recommended.',
      targetAppId: 'APP-78304'
    }
  },
  {
    id: 'APP-78319',
    applicantName: 'Priya Nair',
    individualRisk: 19,
    individualRiskLevel: 'Low',
    ecosystemRisk: 35,
    ecosystemRiskLevel: 'Low',
    novelty: 0.18,
    ecosystem: 'ECO-0995',
    appliedAmount: '₹1,20,000',
    submittedTime: '6.0 hours ago',
    caseId: '8849-0210-D',
    rail: 'Personal Loan Rail • Regional Cluster South',
    maturityState: 'Stage 1',
    coordinatedPattern: 'Isolated Application',
    topDrivers: [],
    recommendedAction: {
      badge: 'STANDARD APPROVAL',
      title: 'Standard Review',
      text: 'Low risk across all dimensions.',
      targetAppId: 'APP-78319'
    }
  },
  {
    id: 'APP-78325',
    applicantName: 'Amit Joshi',
    individualRisk: 55,
    individualRiskLevel: 'Medium',
    ecosystemRisk: 71,
    ecosystemRiskLevel: 'High',
    novelty: 0.67,
    ecosystem: 'ECO-1033',
    appliedAmount: '₹4,10,000',
    submittedTime: '7.2 hours ago',
    caseId: '8849-0222-E',
    rail: 'Auto Loan Underwriting Rail • Regional Cluster East',
    maturityState: 'Stage 2',
    coordinatedPattern: 'Emerging Cluster',
    topDrivers: [
      {
        id: 'driver-501',
        title: 'Address Reuse Anomaly',
        contributionPercent: 19,
        riskLevel: 'Medium',
        details: 'Shared residential location with 4 recent applicants.',
        tags: ['Address Velocity']
      }
    ],
    recommendedAction: {
      badge: 'ENHANCED DUE DILIGENCE',
      title: 'Recommended Action',
      text: 'Address cluster detected. Request property utility bill verification.',
      targetAppId: 'APP-78325'
    }
  }
];

export const MAIN_CLUSTER: EcosystemCluster = {
  id: 'ECO-1024',
  name: 'Synthetic Ring #4029',
  status: 'Critical Topology',
  riskScore: 84,
  novelty: 0.92,
  maturity: 'Stage 3',
  growth: '+34%',
  nodesCount: 14,
  edgesCount: 19,
  detectedPattern: 'Detected: Rapid multi-applicant device collision with synchronized UPI sweep pattern'
};

export const INITIAL_VERIFICATION_TASKS: VerificationTask[] = [
  {
    id: 'task-1',
    title: 'Verify physical device possession',
    description: 'Trigger silent SMS hardware challenge and biometric one-time sign on applicant handset.',
    completed: false
  },
  {
    id: 'task-2',
    title: 'Audit dealer point-of-sale biometric logs',
    description: 'Cross-reference timestamps for Apex Retailers POS terminal with geo-coordinates.',
    completed: false
  },
  {
    id: 'task-3',
    title: 'Request independent guarantor affidavit',
    description: 'Confirm familial affinity and obtain authenticated physical statement from R. Sharma.',
    completed: false
  }
];

export const INITIAL_SIMULATION: SimulationScenario = {
  id: 'scenario-shared-device',
  name: 'Verify Shared Device',
  currentRisk: 84,
  simulatedRisk: 56,
  reductionPts: 28,
  statusBefore: 'Elevated',
  statusAfter: 'Moderate'
};
