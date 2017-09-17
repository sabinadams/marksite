import { Component } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { ImagePicker } from '@ionic-native/image-picker';

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  photo: any = '';
  constructor( private _navCtrl: NavInterceptor,private imagePicker: ImagePicker ) {
    
  }
  
  logout() {
    localStorage.removeItem('TestToken');
    this._navCtrl.navigateUnprotected('clear');
  }

  choosePhoto() {
    // this.photo = 'https://scontent.fsnc1-1.fna.fbcdn.net/v/t1.0-9/21751777_1510585325651086_1533288614129416110_n.jpg?oh=9df813bb8148845e374d96a6ff63b8bd&oe=5A4502E0';
    this.imagePicker.getPictures({}).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          this.photo = results[i];
      }
    }, (err) => { 
    });
  }
}
