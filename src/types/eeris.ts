export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface RiskDriver {
  id: string;
  title: string;
  contributionPercent: number;
  riskLevel: RiskLevel;
  details: string;
  tags: string[];
  metaKey?: string;
  metaValue?: string;
}

export interface RecommendedAction {
  badge: string;
  title: string;
  text: string;
  targetAppId: string;
}

export interface Application {
  id: string;
  applicantName: string;
  individualRisk: number;
  individualRiskLevel: RiskLevel;
  ecosystemRisk: number;
  ecosystemRiskLevel: RiskLevel;
  novelty: number;
  ecosystem: string;
  appliedAmount: string;
  submittedTime: string;
  caseId: string;
  rail: string;
  maturityState: string;
  coordinatedPattern: string;
  topDrivers: RiskDriver[];
  recommendedAction: RecommendedAction;
}

export interface EcosystemCluster {
  id: string;
  name: string;
  status: string;
  riskScore: number;
  novelty: number;
  maturity: string;
  growth: string;
  nodesCount: number;
  edgesCount: number;
  detectedPattern: string;
}

export interface VerificationTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface SimulationScenario {
  id: string;
  name: string;
  currentRisk: number;
  simulatedRisk: number;
  reductionPts: number;
  statusBefore: string;
  statusAfter: string;
}

export type TimelinePhase = 'Before Alert' | 'Alert (Day 0)' | 'Current (Active)';
