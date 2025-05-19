import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { User } from './DTOs/user';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedInSubject = new BehaviorSubject<boolean>(false);

  currentUser: FirebaseUser | null = null;

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      this.isLoggedInSubject.next(user !== null);
      console.log('User state changed:', user);
    });
  }

  login(user: User) {
    return from(
      signInWithEmailAndPassword(this.auth, user.email!, user.password)
        .then((result) => {
          this.currentUser = result.user;
          console.log('User logged in:', result.user);
          return true;
        })
        .catch((error) => {
          console.error('Login error:', error);
          return false;
        })
    );
  }

  register(user: User) {
    return from(
      createUserWithEmailAndPassword(this.auth, user.email!, user.password)
        .then((result) => {
          this.currentUser = result.user;
          return true;
        })
        .catch((error) => {
          console.error('Register error:', error);
          return false;
        })
    );
  }

  logout() {
    return from(
      signOut(this.auth)
        .then(() => {
          this.currentUser = null;
          console.log('User logged out');
        })
        .catch((error) => {
          console.error('Logout error:', error);
        })
    );
  }
}
