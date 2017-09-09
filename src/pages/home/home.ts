import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { LoginPage } from '../login/login';
import { AuthGuard } from '../../shared/services/auth-guard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public navCtrl: NavInterceptor) {

  }
  
  logout() {
    console.log("Logging out");
    localStorage.removeItem("TestToken");
    this.navCtrl.navigate(LoginPage);
  }

  justLoginPage() {
    console.log("Just Login")
    this.navCtrl.navigate(LoginPage);
  }
}
