import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { NavController } from 'ionic-angular';
import { NavInterceptor } from '../../services/nav-interceptor';

@Component({
    templateUrl: 'app-container.html'
})
export class AppContainer {
    rootPage:any = TabsPage;
    
    constructor( public navCtrl: NavController, public navIntercept: NavInterceptor) {}

}