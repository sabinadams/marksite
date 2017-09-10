import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthGuard } from './auth-guard';
import { LoginPage } from '../../pages/login/login';
@Injectable()
export class NavInterceptor {
  private navStream: any;
  public $navObserver: any;  
  constructor(public _authGuard: AuthGuard) {
    this.$navObserver = Observable.create(observer => { 
      this.navStream = observer;
    });
  }
  
  // Navigation actually takes place in app.module.ts because NavController can't be injected to non-component
  // Has to be there because it becomes available first, therefore is accessable and rendered/initialized before everything else.
  // Tried with app-container, but it would have to subscribe to the nav-int observable. The first component after login is
  // app-container though, so there was no previous subscription. Observables aren't actually made until subscribed to
  navigate( page: any ) {
      if(this._authGuard.authenticated()) {
        this.navStream.next( page );        
      }
  }

  // For routing that shouldn't use authorization (Log out transition to login page)
  navigateUnprotected( page: any ) {
    this.navStream.next( page );
  }

}
