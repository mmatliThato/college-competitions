import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-manage-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-results.component.html',
  styleUrl: './manage-results.component.css'
})
export class ManageResultsComponent implements OnInit {
  apiSrv = inject(ApiService);
  
  competitions = signal<any[]>([]);
  participants = signal<any[]>([]);
  selectedCompId: string = '';

  ngOnInit() {
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.apiSrv.getCompetitions().subscribe((res: any) => {
      if (res.result) this.competitions.set(res.data);
    });
  }

  onCompetitionChange() {
    if (this.selectedCompId) {
      this.apiSrv.getParticipants(this.selectedCompId).subscribe((res: any) => {
        if (res.result) this.participants.set(res.data);
      });
    }
  }

  declareWinner(projectId: string) {
    const payload = {
      projectId: projectId,
      competitionId: this.selectedCompId
    };

    if (confirm("Are you sure you want to declare this student the winner?")) {
      this.apiSrv.setWinner(payload).subscribe((res: any) => {
        if (res.result) {
          alert("Winner Announced Successfully!");
          this.onCompetitionChange(); // Refresh list to show trophy
        }
      });
    }
  }
}