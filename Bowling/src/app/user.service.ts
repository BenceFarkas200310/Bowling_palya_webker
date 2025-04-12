import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './DTOs/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(user: User): boolean {
    this.isLoggedInSubject.next(true);
    return true;
  }

  register(user: User): boolean {
    return true;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }
}
