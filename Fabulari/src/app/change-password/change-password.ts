import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, RouterLink],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  protected readonly showPassword0 = signal(false);
  protected readonly showPassword1 = signal(false);
  protected readonly showPassword2 = signal(false);
  protected currentPassword = '';
  protected newPassword = '';
  protected confirmPassword = '';

  togglePasswordVisibility0() {
    this.showPassword0.update((v) => !v);
  }

  togglePasswordVisibility1() {
    this.showPassword1.update((v) => !v);
  }

  togglePasswordVisibility2() {
    this.showPassword2.update((v) => !v);
  }

  onSubmit() {}
}