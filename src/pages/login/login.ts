import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { AppContainer } from '../app-container/app-container';
import { AuthService } from '../../shared/services/auth-service';
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor( public navCtrl: NavInterceptor, public _authService: AuthService ) {
    // If you are already logged in, go to home page
    if( localStorage.getItem('TestToken') == 'TestToken') {
      this.navCtrl.navigate( AppContainer );
    }
  }
  
  // Send to Home Page
  login() {
    this.navCtrl.navigate( AppContainer );
    this._authService.login();
  }
}
