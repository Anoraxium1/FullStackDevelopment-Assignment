import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.html',
    styleUrl: '.login.css',
})
export class Login {
protected readonly showPassword = signal(false);
  protected readonly isLogin = signal(true);
  protected readonly errorMessage = signal('');
  protected email = '';
  protected password = '';

  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }

  setMode(isLogin: boolean) {
    this.isLogin.set(isLogin);
  }

  onSubmit() {}
}