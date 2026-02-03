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

  // Initializing the form with proper validation
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    collegeName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('Student', [Validators.required]) 
  });

onRegister() {
  if (this.registerForm.valid) {
  
    const payload = this.registerForm.value;

    console.log("Pushing this to Render:", payload);

    this.apiSrv.register(payload).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Registration Successful!");
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        console.error("Backend Error:", err.error);
        alert("Error: " + (err.error?.message || "Check console"));
      }
    });
  }
}
}