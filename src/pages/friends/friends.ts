import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FriendsService } from './friends-service';
import { Content, AlertController } from 'ionic-angular';

@Component({
  selector: 'friends-page',
  templateUrl: 'friends.html'
})
export class FriendsPage implements OnInit {
  @ViewChild(Content) content: Content;
  friends: any;
  yPos = 0;
  constructor( public alertCtrl: AlertController, public _friendsService: FriendsService, public zone: NgZone ) {
  }
  
  scrollHandler(event) {
    this.zone.run(() => { this.yPos = event.scrollTop; });
  }

  ngOnInit() {
    this.friends = this._friendsService.getFriends();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  deleteFriend( friend ) {
    let confirm = this.alertCtrl.create({
      title: `Remove ${friend.name}?`,
      buttons: [
        {
          text: 'Nope',
          cssClass: 'deleteButton',
          handler: () => { console.log('Keep clicked'); }
        }, {
          text: `Bye ${friend.name}!`,
          handler: () => { console.log('Delete clicked'); }
        }
      ]
    });
    confirm.present();
  }

  sendLocation( friend ) {
    let confirm = this.alertCtrl.create({
      title: `Send ${friend.name} your location?`,
      message: `This will prompt ${friend.name} to add a marker with your exact location.`,
      buttons: [
        {
          text: 'No way!',
          cssClass: 'deleteButton',
          handler: () => { console.log('Keep clicked'); }
        }, {
          text: 'Sure',
          handler: () => { console.log('Delete clicked'); }
        }
      ]
    });
    confirm.present();
  }
}
