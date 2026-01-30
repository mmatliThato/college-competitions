import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  apiSrv = inject(ApiService);
  router = inject(Router);

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    collegeName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('student') // Default role
  });

  onRegister() {
    if (this.registerForm.valid) {
      this.apiSrv.register(this.registerForm.value).subscribe({
        next: (res: any) => {
          if (res.result) {
            alert("Registration Successful! Please Login.");
            this.router.navigateByUrl('/login');
          }
        },
        error: (err) => {
          // Show the error message from your Express server (e.g., "Email already registered")
          alert(err.error.message || "Registration Failed");
        }
      });
    }
  }
}