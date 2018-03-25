import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { AppContainer } from '../../shared/components/app-container/app-container';
import { AuthService } from '../../shared/services/auth-service';
import { ModalController } from 'ionic-angular';
import { RegisterPage } from './register-page/register-page';
import { ForgotPasswordPage } from './forgot-password/forgot-password';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  message = null;
  constructor( public _modalCtrl: ModalController, public navCtrl: NavInterceptor, public _authService: AuthService ) {}
  
  // Send to Home Page
  login( email, password ) {
     this._authService.login( email, password ).subscribe( res => {
       if ( res.status == 200 && res.userdata.logged_in ) {
         this.navCtrl.navigate( AppContainer );
       } else {
         // Handle an error 
         this.message = 'Invalid login';
         setTimeout(() => {
           this.message = null;
         }, 3000)
       }
     });
  }

  openRegisterModal() {
    let modal = this._modalCtrl.create(RegisterPage,{
      showBackdrop: true,
      cssClass: 'registerModal'
    });
    modal.onDidDismiss(modalData => {
      if ( modalData.success ) {
        this.login( modalData.email, modalData.password ) 
      }
    });
    modal.present();
  }

  openForgotPassModal() {
    let modal = this._modalCtrl.create(ForgotPasswordPage,{
      showBackdrop: true,
      cssClass: 'forgotModal'
    });
    modal.onDidDismiss(modalData => {
      console.log(modalData)
    });
    modal.present();
  }
}
