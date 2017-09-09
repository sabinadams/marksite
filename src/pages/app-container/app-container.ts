import { Component } from '@angular/core';
import { AboutPage } from '../../pages/about/about';
import { ContactPage } from '../../pages/contact/contact';
import { HomePage } from '../../pages/home/home';
import { TabsPage } from '../../pages/tabs/tabs';
import { NavController } from 'ionic-angular';
import { NavInterceptor } from '../../shared/services/nav-interceptor';

@Component({
    templateUrl: 'app-container.html'
})
export class AppContainer {
    rootPage:any = TabsPage;
    
    constructor( public navCtrl: NavController, public navIntercept: NavInterceptor) {}

}