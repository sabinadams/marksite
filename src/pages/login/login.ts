import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { AppContainer } from '../../shared/components/app-container/app-container';
import { AuthService } from '../../shared/services/auth-service';
import { AuthGuard } from '../../shared/services/auth-guard';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor( public navCtrl: NavInterceptor, public _authService: AuthService, public _authGuard: AuthGuard ) {
    // If you are already logged in, go to home page
    if( this._authGuard.authenticated()) {
      this.navCtrl.navigate( AppContainer );
    }
  }
  
  // Send to Home Page
  login() {
    var loggedIn = this._authService.login();
    console.log(loggedIn)
    if ( loggedIn ) this.navCtrl.navigate( AppContainer );
  }
}
