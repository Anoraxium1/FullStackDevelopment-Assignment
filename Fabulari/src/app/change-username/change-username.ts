import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-username',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-username.html',
  styleUrl: './change-username.css',
})
export class ChangeUsername {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal('');
  protected newUsername = '';

  onSubmit() {
    this.errorMessage.set('');

    if (!this.newUsername.trim()) {
      this.errorMessage.set('Username cannot be empty.');
      return;
    }

    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      this.errorMessage.set('You must be logged in.');
      return;
    }
    const currentUser = JSON.parse(stored);

    this.http.put<any>(`http://localhost:3000/api/users/${currentUser.id}`, {
      username: this.newUsername,
    }).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...updatedUser }));
        this.router.navigateByUrl('/settings');
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Unable to change username.');
      },
    });
  }
}
