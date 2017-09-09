import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { LoginPage } from '../../pages/login/login';
import { NavInterceptor } from './nav-interceptor';
@Injectable()
export class AuthService extends BaseService {

 constructor( public navCtrl: NavInterceptor ) { super(); }

 login() {
    localStorage.setItem('TestToken', 'TestToken');
    return true;
 }

 logout() {
     localStorage.removeItem('TestToken');
     // Could move navigation to controller
     this.navCtrl.navigateUnprotected( LoginPage );
 }
 
}