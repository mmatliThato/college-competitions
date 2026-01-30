import { Router, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProjectsComponent } from '../pages/projects/projects.component';
import { StudentsComponent } from '../pages/students/students.component';
import { SubmitProjectComponent } from '../pages/submit-project/submit-project.component';
import { CompetitionComponent } from '../pages/competition/competition.component';
import { ApiService } from './services/api.service';
import { inject } from '@angular/core';
import { ManageResultsComponent } from '../pages/manage-results/manage-results.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  // Changed from 'competitions' to 'projects' to fix the NG04002 error
  { path: 'projects', component: ProjectsComponent }, 
  
  { path: 'student-list', component: StudentsComponent },
  
  // This is the specific submission page for Thato to join a challenge
  { path: 'submit-project/:id', component: SubmitProjectComponent },
  
  { path: 'competition', component: CompetitionComponent },
  
  // College Admin Page to view student lists and declare winners
  { path: 'manage-results', component: ManageResultsComponent }, 

  { 
    path: 'my-projects', 
    component: ProjectsComponent,
    canActivate: [() => inject(ApiService).loggedUser() ? true : inject(Router).createUrlTree(['/login'])]
  },

  // Wildcard: Redirects any typos back to home
  { path: '**', redirectTo: 'home' }
];