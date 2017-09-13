import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { AppContainer } from '../../shared/components/app-container/app-container';
import { AuthService } from '../../shared/services/auth-service';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor( public navCtrl: NavInterceptor, public _authService: AuthService ) {
    
  }
  
  // Send to Home Page
  login() {
    var loggedIn = this._authService.login();
    console.log(loggedIn)
    if ( loggedIn ) this.navCtrl.navigate( AppContainer );
  }
}
