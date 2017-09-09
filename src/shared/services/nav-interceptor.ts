import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthGuard } from './auth-guard';
@Injectable()
export class NavInterceptor {
  private navStream: any;
  public $navObserver = Observable.create(observer => { this.navStream = observer; });
  constructor(public _authGuard: AuthGuard) {
  }
  
  // Navigation actually takes place in app-container.ts because NavController can't be injected to non-component
  navigate( page: any ) {
      console.log("Proxying Nav/Validating Access");
      if(this._authGuard.authenticated()) {
        this.navStream.next( page );        
      }
  }
}
