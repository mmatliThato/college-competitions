import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  private apiSrv = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  compDetails = signal<any>(null);

  submissionObj: any = {
    competitionId: '',
    userId: '',
    projectName: '',
    description: '',
    githubUrl: '',
    techStack: ''
  };

  ngOnInit(): void {
    const compId = this.route.snapshot.paramMap.get('id');
    const user = this.apiSrv.loggedUser(); // Uses the signal in your service

    if (compId) {
      this.submissionObj.competitionId = compId;
      this.loadCompetition(compId);
    }

    if (user) {
      this.submissionObj.userId = user._id;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  loadCompetition(id: string) {
    this.apiSrv.getCompetitionById(id).subscribe((res: any) => {
      if (res.result) this.compDetails.set(res.data);
    });
  }

  onSubmit() {
    this.apiSrv.submitProject(this.submissionObj).subscribe((res: any) => {
      if (res.result) {
        alert("Execution Successful. Your project is now archived.");
        this.router.navigateByUrl('/my-projects');
      }
    });
  }
}