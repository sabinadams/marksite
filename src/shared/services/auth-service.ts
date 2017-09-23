import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { LoginPage } from '../../pages/login/login';
import { NavInterceptor } from './nav-interceptor';
import { HttpClient } from './http-interceptor';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService extends BaseService {

 constructor( public navCtrl: NavInterceptor, public _http: HttpClient ) { super(); }

 // Creates randomized UUID Token for authentication
 _generateToken() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, c => {
      const r = ( d + Math.random() * 16 ) % 16 | 0;
      d = Math.floor( d / 16 );
      return( c === 'x' ? r : ( r & 0x7 | 0x8 ) ).toString( 16 );
    });
  }

 login( email: string, password: string ) {
    let data = { email: email, password: password, token: localStorage.getItem('token') || this._generateToken() };
    return this._http.post(`${this.env.api}/auth/login`, data).map(( res: Response ) => {
       const res_data = res.json();
       if ( res_data.userdata.logged_in ) {
         localStorage.setItem( 'user', JSON.stringify( res_data.userdata ) );
         localStorage.setItem( 'token', res_data.userdata.token );
       }
       return res_data;
     })
 }

 logout() {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     // Could move navigation to controller
     this.navCtrl.navigateUnprotected( LoginPage );
 }
 
}