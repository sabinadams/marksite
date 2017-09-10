import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends-service';
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage implements OnInit {
  friends: any;
  constructor(public _friendsService: FriendsService) {
  }
  
  ngOnInit() {
    this.friends = this._friendsService.getFriends();
  }

}
