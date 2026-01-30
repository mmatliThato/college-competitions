import { Component, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  providers: [DatePipe],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})
export class CompetitionComponent implements OnInit {
  apiSrv = inject(ApiService);
  datePipe = inject(DatePipe);

  // The object used for the form
  competitionObj: any = { 
    title: '', 
    description: '', 
    startDate: '', 
    endDate: '', 
    status: 'Upcoming' 
  };
  
  // FIX: This name must match competitionsList() in your HTML
  competitionsList = signal<any[]>([]);

  ngOnInit() {
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.apiSrv.getCompetitions().subscribe((res: any) => {
      if (res.result) {
        this.competitionsList.set(res.data);
      }
    });
  }

  saveCompetition() {
    // We send _id as competitionId so the backend knows whether to Update or Create
    const payload = { 
      ...this.competitionObj, 
      competitionId: this.competitionObj._id || 0 
    };
    
    this.apiSrv.saveCompetition(payload).subscribe((res: any) => {
      if (res.result) {
        alert("Success!");
        this.resetForm();
        this.loadCompetitions();
      }
    });
  }

  onEdit(data: any) {
    // Format dates so the HTML date input can actually display them
    this.competitionObj = { 
      ...data,
      startDate: this.datePipe.transform(data.startDate, 'yyyy-MM-dd'),
      endDate: this.datePipe.transform(data.endDate, 'yyyy-MM-dd')
    };
  }

  onDelete(id: string) {
    if (confirm("Delete this competition?")) {
      this.apiSrv.deleteCompetition(id).subscribe(() => {
        this.loadCompetitions();
      });
    }
  }

  resetForm() {
    this.competitionObj = { 
      title: '', 
      description: '', 
      startDate: '', 
      endDate: '', 
      status: 'Upcoming' 
    };
  }
}