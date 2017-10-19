import { Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { LoginPage } from '../../pages/login/login';
import { NavInterceptor } from './nav-interceptor';
import { HttpClient } from './http-interceptor';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService extends BaseService {
 // Test
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
    console.log(localStorage.getItem('token') || this._generateToken())
    let data = { email: email, password: password, token: localStorage.getItem('token') || this._generateToken() };
    return this._http.post(`${this.env.api}/auth/login`, data).map(( res: Response ) => {
      let res_data;
      try { res_data = res.json(); } 
      catch( error ) { return res_data = { userdata: { logged_in: false, status: 401 } }; }
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
 
 updateUser( data ) {
     return this._http.securePost(`${this.env.api}/auth/update`, data).map(( res: Response ) => {
          let response = res.json();
          if ( response.valid ) {
            localStorage.setItem('user', JSON.stringify(Object.assign({}, JSON.parse(localStorage.getItem('user')), response.userdata)));
          }
          return response;
     })
 }
}