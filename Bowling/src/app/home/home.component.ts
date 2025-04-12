import { Component, Input } from '@angular/core';
import { AlleyService } from '../alley.service';
import { Alley } from '../DTOs/alley';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  alleys: Alley[] = [];

  constructor(private alleyService: AlleyService) {
    this.alleys = this.alleyService.alleys;
  }
}
