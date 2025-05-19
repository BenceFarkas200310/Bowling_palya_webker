import { Injectable, OnInit } from '@angular/core';
import { Alley } from './DTOs/alley';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlleyService {
  private readonly url = 'http://localhost:3000/alleys';
  alleys: Alley[] = [];

  constructor(private http: HttpClient) {}

  fetchAlleyData(): Observable<Alley[]> {
    return this.http.get<Alley[]>(this.url);
  }

  getAlleyById(id: string): Alley | undefined {
    return this.alleys.find((alley) => alley.id === id);
  }

  createAlley(alley: Alley): Observable<Alley> {
    return this.http.post<Alley>(this.url, alley);
  }

  updateAlley(id: string, updatedAlley: Alley): Observable<Alley> {
    return this.http.put<Alley>(`${this.url}/${id}`, updatedAlley);
  }

  deleteAlley(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
