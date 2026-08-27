import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-birthdate',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-birthdate.html',
  styleUrl: './change-birthdate.css',
})
export class ChangeBirthdate {
  protected newBirthdate = '';

  onSubmit() {}
}