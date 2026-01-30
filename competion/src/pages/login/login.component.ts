import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  apiSrv = inject(ApiService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onLogin() {
    if (this.loginForm.valid) {
      this.apiSrv.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.result) {
            // 1. Save to LocalStorage for persistence
            localStorage.setItem('techNovaUser', JSON.stringify(res.data));
            
            // 2. Update the Signal so the Navbar changes INSTANTLY
            this.apiSrv.loggedUser.set(res.data);
            
            // 3. Navigate to Home or Dashboard
            this.router.navigateByUrl('/home');
          }
        },
        error: (err) => {
          alert(err.error.message || "Invalid Email or Password");
        }
      });
    }
  }
}