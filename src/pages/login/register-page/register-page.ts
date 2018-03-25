import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AuthService } from '../../../shared/services/auth-service';
@Component({
    selector: 'register-page',
    templateUrl: 'register-page.html'
})
export class RegisterPage {
    constructor(  private _authService: AuthService, public _viewCtrl: ViewController ) {}
    email = '';
    password = '';
    repeat_password = '';
    tag = '';
    error_message = null;
    closeModal() {
        this._viewCtrl.dismiss({success: false});
    }
        
    successClose() {
        this._viewCtrl.dismiss({success: true, email: this.email, password: this.password});
    }
    deleteMarker() {
        this._viewCtrl.dismiss({delete: true})
    }

    createAccount() {
        if ( this.tag != '' && this.email != '' && this.password != '' && this.repeat_password != '' && this.password == this.repeat_password ) {
            this._authService.createAccount( this.email, this.password, this.repeat_password, this.tag ).subscribe( res => {
                if ( res.valid ) {
                    this.successClose();
                } else {
                    this.error_message = res.message;
                    setTimeout(() => {
                        this.error_message = null;
                    }, 3000);
                }
            })
        } else {
            this.error_message = 'Please fill out all the required fields.';
            if ( this.password != this.repeat_password ) {
                this.error_message = 'The passwords did not match';
            }
            setTimeout(() => {
                this.error_message = null;
            }, 3000);
        }
    }
}
