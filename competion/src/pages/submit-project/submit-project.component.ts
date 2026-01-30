import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-submit-project',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './submit-project.component.html',
  styleUrl: './submit-project.component.css'
})
export class SubmitProjectComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiSrv = inject(ApiService);
  private router = inject(Router);

  compDetails: any = null;

  // The model now matches the refined Project.js schema in the backend
  submissionObj: any = {
    competitionId: '',
    userId: '',
    projectName: '',
    description: '',
    githubUrl: '',
    techStack: ''
  };

  ngOnInit(): void {
    // 1. Capture Competition ID from the URL (:id)
    const compId = this.route.snapshot.paramMap.get('id');
    if (compId) {
      this.submissionObj.competitionId = compId;
      this.getCompInfo(compId);
    }

    // 2. Capture User ID from Authentication session
    const user = this.apiSrv.loggedUser();
    if (user && user._id) {
      this.submissionObj.userId = user._id;
    } else {
      // Professional Guard: Redirect if not logged in
      this.router.navigateByUrl('/login');
    }
  }

  getCompInfo(id: string) {
    this.apiSrv.getCompetitionById(id).subscribe((res: any) => {
      if (res.result) {
        this.compDetails = res.data;
      }
    });
  }

  onSubmit() {
    // Execute the final submission to the database
    this.apiSrv.submitProject(this.submissionObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Execution Successful. Your project has been archived.");
          this.router.navigateByUrl('/home');
        } else {
          alert("Submission failed: " + res.message);
        }
      },
      error: (err) => {
        console.error("Technical Error during submission", err);
      }
    });
  }
}