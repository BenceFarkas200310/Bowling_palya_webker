import { Component, Input, OnInit } from '@angular/core';
import { AlleyService } from '../alley.service';
import { Alley } from '../DTOs/alley';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  alleys: Alley[] = [];
  alleyForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    maxCapacity: new FormControl('', [Validators.required]),
  });

  constructor(
    private alleyService: AlleyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.alleyService.fetchAlleyData().subscribe(
      (data) => {
        this.alleys = data;
      },
      (error) => {
        console.error('Error fetching alley data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.alleyForm.valid) {
      this.alleyService.createAlley(this.alleyForm.value).subscribe(
        (newAlley: Alley) => {
          console.log('Alley created successfully:', newAlley);
          this.alleys.push(newAlley);
          this.alleyForm.reset();
        },
        (error) => {
          console.error('Error creating alley:', error);
        }
      );
    }
  }

  deleteAlley(alleyId: string): void {
    this.alleyService.deleteAlley(alleyId).subscribe(
      () => {
        console.log('Alley deleted successfully');
        this.alleys = this.alleys.filter((alley) => alley.id !== alleyId);
      },
      (error) => {
        console.error('Error deleting alley:', error);
      }
    );
  }
}
