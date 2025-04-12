import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../DTOs/user';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  tryLogin(): void {
    if (this.loginForm.invalid) return;
    console.log('login');
    let user: User = {
      username: this.loginForm.get('username')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    };

    if (this.userService.login(user)) {
      this.router.navigate(['/home']);
    }
  }
}
