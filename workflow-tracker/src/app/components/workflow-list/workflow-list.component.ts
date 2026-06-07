import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WorkflowService } from '../../services/workflow.service';
import { Workflow } from '../../models/workflow.model';

@Component({
  selector: 'app-workflow-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workflow-list.html',
  styleUrls: ['./workflow-list.css']
})
export class WorkflowListComponent implements OnInit {
  workflows: Workflow[] = [];

  constructor(
    private workflowService: WorkflowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWorkflows();
  }

  loadWorkflows(): void {
    this.workflowService.getWorkflows().subscribe({
      next: (data) => {
        console.log('Workflows loaded:', data);
        this.workflows = data;
      },
      error: (err) => console.error('Failed to load workflows', err)
    });
  }

  editWorkflow(id: string): void {
    this.router.navigate(['/edit', id]);
  }

  deleteWorkflow(id: string): void {
    if (confirm('Delete this workflow?')) {
      this.workflowService.deleteWorkflow(id).subscribe(() => {
        this.loadWorkflows();
      });
    }
  }

  createNew(): void {
    this.router.navigate(['/create']);
  }
}