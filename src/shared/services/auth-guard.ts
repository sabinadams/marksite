import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {

 private isLoggedIn = false;

 constructor() {
   this.isLoggedIn = localStorage.getItem("TestToken") ? true : false;
 }

 // Returns whether the user is currently authenticated
 // Could check if current token is still valid
 authenticated() : boolean {
   return this.isLoggedIn;
 }
}