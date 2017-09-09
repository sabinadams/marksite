import { Component } from '@angular/core';

import { AboutPage } from '../../../pages/about/about';
import { ContactPage } from '../../../pages/contact/contact';
import { HomePage } from '../../../pages/home/home';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
