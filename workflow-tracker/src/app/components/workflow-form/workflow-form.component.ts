import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkflowService } from '../../services/workflow.service';
import { Workflow } from '../../models/workflow.model';

@Component({
  selector: 'app-workflow-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './workflow-form.html',
  styleUrls: ['./workflow-form.css']
})
export class WorkflowFormComponent implements OnInit {
  workflow: Workflow = { name: '', description: '', status: 'ACTIVE' };
  isEdit = false;
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workflowService: WorkflowService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.workflowService.getWorkflow(this.id).subscribe(data => {
        this.workflow = data;
      });
    }
  }

  onSubmit(): void {
    const request = this.isEdit && this.id
      ? this.workflowService.updateWorkflow(this.id, this.workflow)
      : this.workflowService.createWorkflow(this.workflow);

    request.subscribe({
      next: () => {
        this.router.navigate(['/dashboard']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Save failed', err);
        alert('Error saving workflow. Check console.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard']);
  }
}