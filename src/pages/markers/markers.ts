import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { MarkersService } from './markers-service';

@Component({
  selector: 'markers-page',
  templateUrl: 'markers.html'
})
export class MarkersPage implements OnInit{
  markers: any;
  constructor( public modalCtrl: ModalController, public _markersService: MarkersService, public zone: NgZone ) {}
  
  ngOnInit() {
      this._markersService.getMarkers().subscribe( res => {
        this.markers = res;
      });
  }

}
