import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AuthService } from '../../../shared/services/auth-service';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'forgot-password-page',
    templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
    constructor(  private _authService: AuthService, public _viewCtrl: ViewController , private _alertCtrl: AlertController) {}
    email = null;
    code = null;
    message = null;
    password = null;
    password_confirm = null;
    closeModal() {
        this._viewCtrl.dismiss({success: false});
    }
        
    sendEmail() {
        this._authService.sendForgotEmail( this.email ).subscribe( res => {
            this.message = res.message;
            if ( !res.valid ) {
                setTimeout(() => {
                    this.message = null;
                }, 3000)
            }
        })
    }

    resetPass() {
        this._authService.resetPassword( this.code, this.password, this.password_confirm ).subscribe( res => {
            if ( res.valid ) {
                let alert = this._alertCtrl.create({
                    title: 'Password Changed!',
                    buttons: [{
                        text: 'Ok',
                        handler: data => {
                          this.closeModal()
                        }
                      },]
                  });
                  alert.present();
            } else {
                this.message = res.message;
                setTimeout(() => {
                    this.message = null;
                }, 3000)
            }
        });
    }
}
