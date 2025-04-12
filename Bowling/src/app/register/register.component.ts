import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  tryRegister() {
    if (this.registerForm.invalid) return;
    let username: string = this.registerForm.get('username')?.value || '';
    let password: string = this.registerForm.get('password')?.value || '';

    if (this.userService.register(username, password)) {
      this.router.navigate(['/login']);
    }
  }
}
