import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatCardModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,private auth: AuthService, private router:Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.auth.storeToken(res.token);   // ✅ store JWT
        console.log('Token stored:', res.token); // debug check
      //  this.router.navigate(['/todos']);  // redirect after login
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
    this.loginForm.reset();
  }
}
