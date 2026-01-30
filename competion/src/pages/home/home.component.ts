import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // Required for @for and [routerLink]
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  apiSrv = inject(ApiService);
  competitionList = signal<any[]>([]);

  ngOnInit() {
    this.loadCompetitions();
  }

  loadCompetitions() {
    this.apiSrv.getCompetitions().subscribe((res: any) => {
      if (res.result) {
        this.competitionList.set(res.data);
      }
    });
  }
}