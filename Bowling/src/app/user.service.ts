import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean = false;
  constructor() {}

  login(username: string, password: string) {
    this.isLoggedIn = true;
  }
}
