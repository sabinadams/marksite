import { Component } from '@angular/core';
import { ModalController, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'map-info-modal',
    templateUrl: 'modal-page.html'
})
export class MapModalPage {
    memo: string;
    image: string;
    constructor( params: NavParams, public _viewCtrl: ViewController ) {
        if( params.get('memo') ) this.memo = params.get('memo');
        if( params.get('img') ) this.image = params.get('img');
    }
    
    closeModal() {
        this._viewCtrl.dismiss();
    }
    
    deleteMarker() {
        this._viewCtrl.dismiss({delete: true})
    }
}