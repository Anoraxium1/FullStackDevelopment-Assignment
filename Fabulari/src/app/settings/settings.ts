import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  protected readonly darkMode = signal(false);
  protected readonly showPassword = signal(false);

  toggleTheme() {
    this.darkMode.update((v) => !v);
    document.body.classList.toggle('dark-theme', this.darkMode());
  }

  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
}