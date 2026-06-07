import { Routes } from '@angular/router';
import { WorkflowListComponent } from './components/workflow-list/workflow-list.component';
import { WorkflowFormComponent } from './components/workflow-form/workflow-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: WorkflowListComponent },
  { path: 'create', component: WorkflowFormComponent },
  { path: 'edit/:id', component: WorkflowFormComponent },
  { path: '**', redirectTo: '/dashboard' }
];