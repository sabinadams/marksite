import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../shared/services/auth-service';
@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  photo: any = '';
  mode = false;
  user = JSON.parse(localStorage.getItem('user'));
  message = null;
  constructor( private _authService: AuthService, private _alertCtrl: AlertController ) {}
  

  pureForm = {
    email: true,
    password: true,
    tag: true,
    username: true
  };

  newForm = {
    email: '',
    password: '',
    username: '',
    tag: ''
  };

  ionViewDidLeave() {
    this.mode = false;
  }

  logout() {
   this._authService.logout();
  }
  
  formChange( type ) {
    if ( type != 'password'){
      this.pureForm[type] = this.newForm[type] != this.user[type] && this.newForm[type].length > 0 ? false : true;
    } else {
      this.pureForm.password = this.newForm.password.length > 0 ? false : true;
      
    }
  }

  savePreCheck( username, tag, email, password ) {
    if ( !this.pureForm.password ) {
      //Password verify popup
      let prompt = this._alertCtrl.create({
          title: 'Confirm New Password',
          inputs: [
            {
              name: 'old_pass',
              placeholder: 'Old Password',
              type: 'password'
            },
            {
              name: 'new_pass',
              placeholder: 'New Password',
              type: 'password'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {  console.log("Cancelled Save")}
            },
            {
              text: 'Save',
              handler: data => {
                if ( data.new_pass == this.newForm.password ) {
                  this.newForm['old_password'] = data.old_pass;
                  this.save( this.newForm );
                } else {
                  // Missing Password
                }
              }
            }
          ]
        });
        prompt.present();

    } else {
      this.save( this.newForm );
    }
  }
  
  save( data ) {
    this._authService.updateUser( data ).subscribe( res => {
      if ( res.valid ) {
        this.newForm = {
          email: '',
          password: '',
          username: '',
          tag: ''
        };
        this.pureForm = {
          email: true,
          password: true,
          tag: true,
          username: true
        };
        this.mode = false;
        this.user = JSON.parse(localStorage.getItem('user'));
      } else {
        this.message = res.message;
        setTimeout(() => {
          this.message = null;
        }, 3000);
      }

    });
  }
}
