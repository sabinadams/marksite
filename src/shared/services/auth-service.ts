import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
@Injectable()
export class AuthService extends BaseService {

 constructor() { super(); }

 login() {
    console.log("Loggin' In");
 }

 logout() {
     console.log("Loggin' Out");
 }

}