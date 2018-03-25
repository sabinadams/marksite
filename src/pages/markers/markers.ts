import { Component, OnInit } from '@angular/core';
import { AlertController, Tabs, NavController } from 'ionic-angular';
import { MapService } from '../../shared/services/map-service';
import { NavInterceptor } from '../../shared/services/nav-interceptor';

@Component({
  selector: 'markers-page',
  templateUrl: 'markers.html'
})
export class MarkersPage implements OnInit{
  markers: any;
  constructor( public nav: NavController, public alertCtrl: AlertController, public _mapService: MapService, public _navCtrl: NavInterceptor ) {}
  
  ngOnInit() {
      this._mapService.getMarkers().subscribe( res => {
        this.markers = res;
        this._mapService.$markerStream.subscribe( evt => {
          switch ( evt.type ) {
            case 'delete':
            this.markers = this.markers.filter( item => {
              return item.ID != evt.marker.ID;
            });
            break;
            case 'add':
              this.markers.push( evt.marker );
          }
        });
      });
  }

  shareMarker( marker ) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Share with friends');
      alert.addInput({
        name: 'tag',
        placeholder: `Enter user's tag`
      });
    alert.addButton({
      text: 'Ship it',
      handler: data => {
        this._mapService.sendMarkerToUser( marker.ID, data ).subscribe( res => {
          console.log(res);
        })
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
          handler: () => { 
            this._mapService.deleteMarker( marker ).subscribe( res => {
              
            }); 
          }
        }
      ]
    });
    confirm.present();
  }

  gotoMarker( marker ) {
    this._mapService.updateLocation( {
      lat: marker.yloc,
      long: marker.xloc
    } );
    this.nav.parent.select(0);
  }

}
