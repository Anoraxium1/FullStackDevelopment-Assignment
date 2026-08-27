import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report',
  imports: [FormsModule, RouterLink],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report {
  protected username = '';
  protected reason = '';
  
  onSubmit() {}
}