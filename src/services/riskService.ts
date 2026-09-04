import type { Application, EcosystemCluster, VerificationTask, SimulationScenario } from '../types/eeris';
import { INITIAL_APPLICATIONS, MAIN_CLUSTER, INITIAL_VERIFICATION_TASKS, INITIAL_SIMULATION } from '../data/mockData';

class RiskService {
  private applications: Application[] = [...INITIAL_APPLICATIONS];
  private cluster: EcosystemCluster = { ...MAIN_CLUSTER };
  private tasks: VerificationTask[] = [...INITIAL_VERIFICATION_TASKS];
  private simulation: SimulationScenario = { ...INITIAL_SIMULATION };

  public getApplications(): Application[] {
    return this.applications;
  }

  public getApplicationById(id: string): Application | undefined {
    return this.applications.find(app => app.id.toLowerCase() === id.toLowerCase());
  }

  public getEcosystemCluster(_clusterId: string = 'ECO-1024'): EcosystemCluster {
    return this.cluster;
  }

  public getVerificationTasks(): VerificationTask[] {
    return this.tasks;
  }

  public toggleVerificationTask(taskId: string): VerificationTask[] {
    this.tasks = this.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    return [...this.tasks];
  }

  public getSimulationScenario(): SimulationScenario {
    return this.simulation;
  }
}

export const riskService = new RiskService();
