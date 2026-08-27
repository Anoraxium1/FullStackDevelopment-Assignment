import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface currentUser {
  email: string;
  username: string;
  birthdate: string;
  role: string;
}

@Component({
  selector: 'app-settings',
  imports: [RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  protected readonly showPassword = signal(false);
  protected readonly darkMode = signal(localStorage.getItem('darkMode') === 'true');
  protected readonly currentUser = signal<currentUser | null>(null);

  ngOnInit() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
    }
  }

  toggleTheme() {
  this.darkMode.update((v) => !v);
  document.body.classList.toggle('dark-theme', this.darkMode());
  localStorage.setItem('darkMode', String(this.darkMode()));
}

  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
}