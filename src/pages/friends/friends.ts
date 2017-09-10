import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FriendsService } from './friends-service';
import { Content } from 'ionic-angular';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage implements OnInit {
  @ViewChild(Content) content: Content;
  friends: any;
  yPos = 0;
  constructor(public _friendsService: FriendsService, public zone: NgZone) {
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
}
