import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard {

 constructor() {}

 // Returns whether the user is currently authenticated
 // Could check if current token is still valid
 authenticated() : boolean {
   return localStorage.getItem('token') != null ? true : false;;
 }
}