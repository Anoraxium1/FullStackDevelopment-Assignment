import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-username',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-username.html',
  styleUrl: './change-username.css',
})
export class ChangeUsername {
  protected newUsername = '';

  onSubmit() {}
}