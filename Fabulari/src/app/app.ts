import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-theme');
    }
  }
}