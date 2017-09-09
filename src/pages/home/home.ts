import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { LoginPage } from '../login/login';
import { AuthGuard } from '../../shared/services/auth-guard';
import { AuthService } from '../../shared/services/auth-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public navCtrl: NavInterceptor, public _authService: AuthService ) {

  }
  
  logout() {
    this._authService.logout();
  }
  
}
