import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { ImagePicker } from '@ionic-native/image-picker';
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
  
  constructor( private _authService: AuthService, private _alertCtrl: AlertController, private _navCtrl: NavInterceptor,private imagePicker: ImagePicker ) {}
  

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
    console.log('Test');
    this.mode = false;
  }

  logout() {
    localStorage.removeItem('TestToken');
    this._navCtrl.navigateUnprotected('clear');
  }

  choosePhoto() {
    this.imagePicker.getPictures({}).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.photo = results[i];
      }
    }, (err) => { 
    });
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
        // Error message thingy
      }

    });
  }
}
