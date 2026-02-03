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
  private apiSrv = inject(ApiService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onLogin() {
  this.apiSrv.login(this.loginForm.value).subscribe((res: any) => {
  if (res.result) {
    localStorage.setItem('techNovaUser', JSON.stringify(res.data));
    this.apiSrv.loggedUser.set(res.data);
    if (res.data.role === 'College') {
      console.log("Admin detected!");
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/home');
    }
  }
});
  }
}