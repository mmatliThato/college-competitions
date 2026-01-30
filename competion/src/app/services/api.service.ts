import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'http://localhost:5001/api/';

  // Professional Signal for User State
  loggedUser = signal<any>(this.getUserFromStorage());

  private getUserFromStorage() {
    const data = localStorage.getItem('techNovaUser');
    return data ? JSON.parse(data) : null;
  }

  // --- AUTHENTICATION METHODS ---
  login(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, obj);
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}register`, obj);
  }

  logout() {
    localStorage.removeItem('techNovaUser');
    this.loggedUser.set(null);
    this.router.navigateByUrl('/login');
  }

  // --- COMPETITION METHODS ---
  getCompetitions(): Observable<any> {
    return this.http.get(`${this.baseUrl}getCompetitions`);
  }

  getCompetitionById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}getCompetitionById/${id}`);
  }

  saveCompetition(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}saveCompetition`, obj);
  }

  deleteCompetition(id: string): Observable<any> {
    // Note: Ensure your server.js has this DELETE route implemented
    return this.http.delete(`${this.baseUrl}deleteCompetition/${id}`);
  }

  // --- PROJECT SUBMISSION METHODS ---
  submitProject(projectObj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}project`, projectObj);
  }

  getUserSubmissions(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}getUserSubmissions/${userId}`);
  }


// This signal keeps Thato logged in across the whole ap
  // Logic to fetch participants for the College Admin
  getParticipants(compId: string) {
    return this.http.get(`http://localhost:5001/api/getParticipants/${compId}`);
  }

  // Logic to award the trophy
  setWinner(payload: any) {
    return this.http.post(`http://localhost:5001/api/setWinner`, payload);
  }





  // --- NEW: FETCH RECENT WINNERS FOR HOME PAGE ---
  getRecentWinners(): Observable<any> {
    return this.http.get(`${this.baseUrl}recent-winners`);
  }

  // --- NEW: FETCH DASHBOARD STATS FOR COLLEGE ADMIN ---
  getCollegeStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}college-stats`);
  }

  // --- EXISTING METHODS ---
 



}