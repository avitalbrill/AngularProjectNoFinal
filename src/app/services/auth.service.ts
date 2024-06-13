import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn2: boolean = false;

  constructor() {}

  setLoggedIn(value: boolean) {
    this.loggedIn2 = value;
  }

  isLoggedIn2(): boolean {
    return this.loggedIn2;
  }
}
