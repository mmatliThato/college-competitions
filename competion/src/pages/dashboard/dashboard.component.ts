import { Component, inject } from '@angular/core';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
apiSrv = inject(ApiService); 
}
