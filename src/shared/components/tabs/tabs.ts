import { Component } from '@angular/core';
import { SettingsPage } from '../../../pages/settings/settings';
import { MarkersPage } from '../../../pages/markers/markers';
import { FriendsPage } from '../../../pages/friends/friends';
import { MapPage } from '../../../pages/map/map';
@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = FriendsPage;
  tab3Root = MarkersPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
