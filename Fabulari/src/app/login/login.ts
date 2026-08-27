import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  protected readonly showPassword = signal(false);
  protected readonly errorMessage = signal('');
  protected email = '';
  protected password = '';

  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
  
  onSubmit() {
    this.http.post<any>('http://localhost:3000/api/auth', {
      email: this.email,
      password: this.password,
    }).subscribe({
      next: (response) => {
        if (response.valid) {
          this.errorMessage.set('');
          this.router.navigateByUrl('/chat');
        } else {
          this.errorMessage.set('Invalid email or password');
        }
      },
      error: () => {
        this.errorMessage.set('Unable to reach the server.');
      },
    });
  }
}