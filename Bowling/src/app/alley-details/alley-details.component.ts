import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlleyService } from '../alley.service';
import { Alley } from '../DTOs/alley';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alley-details',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './alley-details.component.html',
  styleUrl: './alley-details.component.css',
})
export class AlleyDetailsComponent implements OnInit {
  alley: Alley | null = null;
  isEditing: boolean = false;

  editForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    maxCapacity: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private alleyService: AlleyService
  ) {}

  ngOnInit(): void {
    const alleyId = this.route.snapshot.paramMap.get('id');
    if (alleyId) {
      this.alley = this.alleyService.getAlleyById(alleyId)!;
      console.log(this.alley);
    }
  }

  deleteAlley(id: string): void {}

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.alley) {
      this.editForm.patchValue(this.alley);
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.alley) {
      const updatedAlley = { ...this.alley, ...this.editForm.value };
      this.alleyService.updateAlley(this.alley.id, updatedAlley).subscribe(
        () => {
          console.log('Alley updated successfully');
          this.alley = updatedAlley;
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating alley:', error);
        }
      );
    }
  }
}
