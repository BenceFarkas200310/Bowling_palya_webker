import { Injectable, OnInit } from '@angular/core';
import { Alley } from './DTOs/alley';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlleyService implements OnInit {
  private readonly url = 'http://localhost:3000/alleys';
  alleys: Alley[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAlleyData();
  }
  fetchAlleyData() {
    this.http.get<Alley[]>(this.url).subscribe((data) => {
      this.alleys = data;
    });
  }
}
