import { Component, OnInit } from '@angular/core';
import { AlertController, Tabs, NavController } from 'ionic-angular';
import { FriendsService } from '../friends/friends-service';
import { MarkersService } from './markers-service';
import { MapService } from '../map/map-service';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
@Component({
  selector: 'markers-page',
  templateUrl: 'markers.html'
})
export class MarkersPage implements OnInit{

  markers: any;
  constructor( public nav: NavController, public alertCtrl: AlertController, public _markersService: MarkersService, public _friendsService: FriendsService, public _mapService: MapService, public _navCtrl: NavInterceptor ) {}
  
  ngOnInit() {
      this._markersService.getMarkers().subscribe( res => {
        this.markers = res;
      });
  }

  shareMarker( marker ) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Share with friends');
    
    let friends = this._friendsService.getFriends();

    for ( let friend of friends ) {
      alert.addInput({
        type: 'checkbox',
        label: friend.name,
        value: friend.id.toString()
      });
    }


    alert.addButton({
      text: 'Ship it',
      handler: data => {
        console.log('Checkbox data:', data);
      }
    });

    alert.present();
  }

  deleteMarker( marker ) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this marker?',
      message: "This will remove the marker from all who you've shared it with.",
      buttons: [
        {
          text: 'Nah, keep it',
          handler: () => { console.log('Keep clicked'); }
        }, {
          text: 'Do it!',
          cssClass: 'deleteButton',
          handler: () => { console.log('Delete clicked'); }
        }
      ]
    });
    confirm.present();
  }

  gotoMarker( marker ) {
    this._mapService.updateLocation( {
      lat: marker.lat,
      long: marker.long
    } );
    var t: Tabs = this.nav.parent;
    t.select(0);    
  }

}
