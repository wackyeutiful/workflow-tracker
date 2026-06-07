export interface Workflow {
  id?: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  createdAt?: Date;
}