import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Now using the environment-based URL
  private baseUrl = environment.apiUrl; 

  // Professional Signal for User State
  loggedUser = signal<any>(this.getUserFromStorage());

  private getUserFromStorage() {
    const data = localStorage.getItem('techNovaUser');
    return data ? JSON.parse(data) : null;
  }


  login(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, obj);
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, obj);
  }
  logout() {
    localStorage.removeItem('techNovaUser');
    this.loggedUser.set(null);
    this.router.navigateByUrl('/login');
  }

  getCompetitions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCompetitions`);
  }

  getCompetitionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getCompetitionById/${id}`);
  }

  saveCompetition(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/saveCompetition`, obj);
  }

  deleteCompetition(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCompetition/${id}`);
  }

  submitProject(projectObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/project`, projectObj);
  }

  getUserSubmissions(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUserSubmissions/${userId}`);
  }

  getParticipants(compId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getParticipants/${compId}`);
  }

  setWinner(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/setWinner`, payload);
  }

  getRecentWinners(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recent-winners`);
  }

  getCollegeStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/college-stats`);
  }
}