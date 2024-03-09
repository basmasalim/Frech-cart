import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  errMsg: string = '';
  isLoadind: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });
  handleForm(): void {
    const userData = this.loginForm.value;
    this.isLoadind = true;
    if (this.loginForm.valid === true) {
      this._AuthService.login(userData).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            localStorage.setItem('eToken', response.token);
            this._AuthService.decodeUser();
            this.isLoadind = false;
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoadind = false;
        },
      });
    }
  }
}
