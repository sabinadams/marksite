// My modified version of the Http service
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from './base-service';
import { NavInterceptor } from './nav-interceptor';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class HttpClient {
  http: any;
  constructor(http: Http, public _baseService: BaseService, public _navCtrl: NavInterceptor ) {
    this.http = http;
  }

  // Used to append the Device token bearer and Authorization headers to all requests
  createAuthorizationHeader( headers: Headers ) {
    headers.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
  }

  // We don't necessarily want to log a user out and send them to login screen if something doesn't load correctly.
  killSession(error){
    // Send you home
    // console.log( 'Session Killed', error );
    return Observable.of( false );
  }

  // Changes GET requests to always require the device token and Authorization headers
  secureGet(url) {
    const headers = new Headers({ 'Accept': 'application/json' });
    this.createAuthorizationHeader(headers);
    return this.http.get(url, { headers: headers }).map((res: Response) => {
      if ( res.json().status != 200 ) {
        console.log("The status code was not 200 (success). Validating session");
        this.validateSession(url).subscribe(valid => {
          console.log(`Valid: ${valid.value}`)
        });
      }
      return res;
    }).catch(( error: any ) => {
        return this.killSession(error);
    });
  }

  // Changes POST requests to always require the device token and Authorization headers
  securePost(url, data) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, { headers: headers }).map( (res: Response) => {
      if ( res.json().status != 200 ) {
        console.log("The status code was not 200 (success). Validating session");
        this.validateSession(url).subscribe(valid => {
          console.log(`Valid: ${valid.value}`)
        });
      }
      return res; 
    })
    .catch(( error: any ) => {
        return this.killSession(error);
    });
  }
  
  post(url, data) {
    return this.http.post(url, data).map( (res: Response) => {
      if ( res.json().status != 200 ) {
        console.log("The status code was not 200 (success). Validating session");
        this.validateSession(url).subscribe(valid => {
          console.log(`Valid: ${valid.value}`)
        });
      }
      return res;    
    })
    .catch(( error: any ) => {
        return this.killSession(error);
    });
  }

  get(url) {
    const headers = new Headers({ 'Accept': 'application/json' });
    return this.http.get(url, { headers: headers }).map((res: Response) => {
      if ( res.json().status != 200 ) {
        console.log("The status code was not 200 (success). Validating session");
        this.validateSession(url).subscribe(valid => {
          console.log(`Valid: ${valid.value}`)
        });
      }
      return res;
    }).catch(( error: any ) => {
        return this.killSession(error);
    });
  }


  validateSession(url) {
    if ( localStorage.getItem('token') == null ) {
        console.log("No token found. Going to login");
        if ( url != `${this._baseService.env.api}/auth/login`) {
          this._navCtrl.navigateUnprotected( 'clear' );          
        }
        return Observable.of(true);
    } else {
      console.log(`${this._baseService.env.api}/auth/validatesession`);
      return this.http.post(`${this._baseService.env.api}/auth/validatesession`, { token: localStorage.getItem('token')}).map((res: Response) => {
        let body = res.json();
        if (!body.valid) {
          console.log("Not a valid session. Logging out...");
          this._navCtrl.navigateUnprotected( 'clear' );
          return Observable.of( false );
        }  else {
          console.log("Valid session but non-successful status code. Must have been an authorization/authentication/user error ")
          return Observable.of( true);
        }
      }).catch( (error: any) => {
        return this.killSession(error);
      });
    }
  }
}
