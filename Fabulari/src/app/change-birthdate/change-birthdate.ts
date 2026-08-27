import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-birthdate',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-birthdate.html',
  styleUrl: './change-birthdate.css',
})
export class ChangeBirthdate {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal('');
  protected newBirthdate = '';

  onSubmit() {
    this.errorMessage.set('');

    if (!this.newBirthdate) {
      this.errorMessage.set('Please choose a birthdate.');
      return;
    }

    const stored = localStorage.getItem('currentUser');
    if (!stored) {
      this.errorMessage.set('You must be logged in.');
      return;
    }
    const currentUser = JSON.parse(stored);

    this.http.put<any>(`http://localhost:3000/api/users/${currentUser.id}`, {
      birthdate: this.newBirthdate,
    }).subscribe({
      next: (updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...updatedUser }));
        this.router.navigateByUrl('/settings');
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'Unable to change birthdate.');
      },
    });
  }
}
